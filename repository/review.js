'use strict';
const context_common = require('../context.common.js');
const locationRepository = require('./location.js');
const jsonQuery = require('json-query')


module.exports = {
    get_reviews(request){
        // creating object to return
        let retVal= {
            metadata:undefined,
            reviews: []
        } 

        // making search for sepecific location
        let GoogleLocationInformation;
        let GoogleLocationBasicInformation;
        try{
            GoogleLocationBasicInformation=locationRepository.search({name:request.name})[0];
        }
        catch(e){
            console.log("google for "+request.name +" search did work error:"+e)
        }
        //get all the reviews
        if(GoogleLocationBasicInformation!=undefined){

            // get google reviews
            try{
                // update not just review but also metadata
                GoogleLocationInformation=get_google(GoogleLocationBasicInformation);
                retVal.metadata=GoogleLocationInformation.metadata;
                retVal.reviews.push(GoogleLocationInformation.reviews);
            }
            catch(e){
                console.log("google for "+request.name+" reviews did work error:"+e)
            }
            
            // get yelp reviews
            try{
                let yelp_review=get_yelp(GoogleLocationInformation.metadata)            
                retVal.reviews.push(yelp_review);
            }
            catch(e){
                console.log("yelp for "+request.name+"reviews did work error:"+e)
            }    

            // get yelp zomato
            try{
                let zomato_review=get_zomato(GoogleLocationInformation.metadata)            
                retVal.reviews.push(zomato_review);
            }
            catch(e){
                console.log("zomato for "+request.name+"reviews did work error:"+e)
            }    

            
            try{
                let tripadviser_review=get_tripadviser(GoogleLocationInformation.metadata)            
                retVal.reviews.push(tripadviser_review);
            }
            catch(e){
                console.log("tripadviser for "+request.name+"reviews did work error:"+e)
            }    

            
            
        }
        else{
            console.log("google for "+request.name +" didn't find anything")
        }
        return retVal;          
    }
}  

// return reviews but also the metadata
function get_google(GoogleLocationInformation){
    // get information for location from google 
    let get_request={
        url:'https://maps.googleapis.com/maps/api/place/details/json?placeid='+GoogleLocationInformation.place_id+'&key=AIzaSyC_jyDsWS4RloJpkkqctnIc8SVirGIYgjY'
    };
    let response;
    let json;
    try{
        response=context_common.http.request_get(get_request)
    }
    catch(e){
        console.log("call to google failed url "+ get_request.url+" error "+e);
        throw e;
    }
    try{
        json=JSON.parse(response);
    }
    catch(e){
        console.log("failed to parse google response "+response+" error "+e);
        throw e;
    }
    // parse reviews to correct structure
    let reviews=[];
    json.result.reviews.forEach(function(element) {
        let review={
            rating:element.rating,
            time:element.relative_time_description,
            text:element.text
        };
        reviews.push(review);
    });

    // build return object
    let retval=
    {
        reviews:{
            rating:json.result.rating,
            number_of_reviews:'N/A',
            source:'google',
            reviews:reviews    
        },
        metadata:{
            google_id:GoogleLocationInformation.place_id,
            address:json.result.formatted_address,
            name:json.result.name,
            phone_number:json.result.formatted_phone_number,
            area_near:json.result.vicinity,
            description:GoogleLocationInformation.description,
            website:json.result.website,
            location:{
                lat:json.result.geometry.location.lat,
                lng:json.result.geometry.location.lng
            }
        }
    }
    return retval;
}

function get_yelp(metadata){
    // get token from yelp
    let access_token;
    try{
        let post_request={
            url:'https://api.yelp.com/oauth2/token',
            params:'grant_type=client_credentials&client_id=vQaZSE0GZuZ6YJSIkieYfQ&client_secret=VqGj4unXZ7ReKIeLuZkrdYwimu1N4QMySUqhT5SnftivSIerMk7OLyNyVzNGJ8tJ'
        };
        let token=context_common.http.request_post(post_request);
        access_token=JSON.parse(token).access_token;
        }
    catch(e){
        console.log("failed toget token for yelp error "+e);
        throw e;
    }
    
    
    var Yelp = require('yelp-v3');
    
    var yelp = new Yelp({
        access_token: access_token,
    });

    let businessMatchYelp;
    // serch for yelp business id
    try{
        yelp.search({
            term: metadata.name, 
            location: metadata.area_near, 
            },
            function(error, data) {
                businessMatchYelp=data;  
            }
        );
    
        while(businessMatchYelp === undefined) {
            require('deasync').runLoopOnce();
        }
    }
    catch(e){
        console.log("failed yelp search "+e);
        throw e;
    }
    
    let businessYelp;
    let reviewsYelp;
    // search for yelp business details and reviews (2 different calls)
    try{
        //https://github.com/Yelp/yelp-api-v3/blob/master/docs/api-references/businesses-id-reviews.md
        yelp.businesses(businessMatchYelp.businesses[0].id, function(error, data) {businessYelp=data;});
        
    
        //https://github.com/Yelp/yelp-api-v3/blob/master/docs/api-references/businesses-id.md
        yelp.businessesReviews(businessMatchYelp.businesses[0].id, function(error, data) {reviewsYelp=data;});
    
        while(businessYelp === undefined || reviewsYelp === undefined) {
            require('deasync').runLoopOnce();
        }
    }
    catch(e){
        console.log("failed yelp get business data or reviews "+e);
        throw e;
    }

    let reviews=[];
    reviewsYelp.reviews.forEach(function(element) {
        let review={
            rating:element.rating,
            time:element.time_created,
            text:element.text
        };
        reviews.push(review);
    });

    
    let retval=
    {
        rating:businessYelp.rating,
        number_of_reviews:businessYelp.review_count,
        source:'yelp',
        yelp_id:businessMatchYelp.businesses[0].id,
        reviews:reviews
    }
    return retval;
}

function get_zomato(metadata){
    // get token from yelp
    let zomato_search_result;
    try{
        let request_get={
            url:'https://developers.zomato.com/api/v2.1/search?q='+metadata.name+'&lat='+metadata.location.lat+'&lon='+metadata.location.lng,
            headers:{"user-key":"448f12a4c9e58334058a96bf10c16cbd"}
        };
        let response=context_common.http.request_get(request_get);
        zomato_search_result=JSON.parse(response);
        }
    catch(e){
        console.log("search failed zomato error "+e);
        throw e;
    }
    let zomato_restaurant=zomato_search_result.restaurants[0].restaurant;
    let zomato_review_result;
    try{
        let request_get={
            url:'https://developers.zomato.com/api/v2.1/reviews?res_id='+zomato_restaurant.id,
            headers:{"user-key":"448f12a4c9e58334058a96bf10c16cbd"}
        };
        let response=context_common.http.request_get(request_get);
        zomato_review_result=JSON.parse(response);
        }
    catch(e){
        console.log("review failed zomato error "+e);
        throw e;
    }

    let reviews=[];
    zomato_review_result.user_reviews.forEach(function(element) {
        let review={
            rating:element.review.rating,
            time:element.review.review_time_friendly,
            text:element.review.review_text
        };
        reviews.push(review);
    });

    
    let retval=
    {
        rating:zomato_restaurant.user_rating.aggregate_rating,
        number_of_reviews:zomato_restaurant.user_rating.votes,
        source:'zomato',
        zomato_id:zomato_restaurant.id,
        reviews:reviews
    }
    return retval;
}

function get_tripadviser(metadata){
    // get token from yelp
    let google_search_result;
    try{
        let request_get={
            url:'https://www.googleapis.com/customsearch/v1?key=AIzaSyAZnGD9oKSiQxQdBBSDRRMSAqvDg__sfgQ&cx=008786984061848902811:9tp-ocrbvdw&q='+metadata.description
        };
        let response=context_common.http.request_get(request_get);
        google_search_result=JSON.parse(response);
        }
    catch(e){
        console.log("search failed google error "+e);
        throw e;
    }
   /* let tripadviser_id=google_search_result.items[0].formattedUrl.split("g")[1].split('-')[0];
    let tripadviser_result;
    try{
        let request_get={
            url:'http://api.tripadvisor.com/api/partner/2.0/location/'+tripadviser_id+'?key=',
            headers:{"X-TripAdvisor-API-Key":""}
            
        };
        let response=context_common.http.request_get(request_get);
        tripadviser_result=JSON.parse(response);
        }
    catch(e){
        console.log("failed tripadviser error "+e);
        throw e;
    }*/
    
    let retval=
    {
        rating:google_search_result.items[0].htmlSnippet.split('rated ')[1].split(' ')[0],
        number_of_reviews:google_search_result.items[0].htmlSnippet.split('See ')[1].split(' ')[0],
        source:'tripadviser',
        zomato_id:0,
        reviews:[]
    }
    return retval;
}
