'use strict';
const context_common = require('../context.common.js');
const locationRepository = require('./location.js');
const jsonQuery = require('json-query')


module.exports = {
    get_reviews(request){
        let GoogleLocationInformation=locationRepository.search({name:request.name})[0];
        GoogleLocationInformation=get_google(GoogleLocationInformation);
        let retVal= {
            metadata:GoogleLocationInformation.metadata,
            reviews:
                [GoogleLocationInformation.reviews,get_yelp(GoogleLocationInformation.metadata)]
        } 
        return retVal;          
    }
}  

function get_google(GoogleLocationInformation){
    var helpers = {
        parse: function(input){
            let retVal=[];
            input.forEach(function(element) {
                let review={
                    rating:element.rating,
                    time:element.relative_time_description,
                    text:element.text
                };
                retVal.push(review);
            });
            return retVal;
        }
      };


    let get_request={
        url:'https://maps.googleapis.com/maps/api/place/details/json?placeid='+GoogleLocationInformation.place_id+'&key=AIzaSyC_jyDsWS4RloJpkkqctnIc8SVirGIYgjY'
    };

    let response=context_common.http.request_get(get_request)
    let json=JSON.parse(response);
    
    let reviews=jsonQuery('result.reviews:parse', {
        data: json, locals: helpers
    }).value;
    
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
            website:json.result.website
        }
    }
    return retval;
}

function get_yelp(metadata){
    let post_request={
        url:'https://api.yelp.com/oauth2/token',
        params:'grant_type=client_credentials&client_id=vQaZSE0GZuZ6YJSIkieYfQ&client_secret=VqGj4unXZ7ReKIeLuZkrdYwimu1N4QMySUqhT5SnftivSIerMk7OLyNyVzNGJ8tJ'
    };
    let token=context_common.http.request_post(post_request);
    let access_token=JSON.parse(token).access_token;
    
    
    var Yelp = require('yelp-v3');
    
    var yelp = new Yelp({
        access_token: access_token,
    });
    
    let businessMatchYelp;
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
    
    let businessYelp;
    let reviewsYelp;

    //https://github.com/Yelp/yelp-api-v3/blob/master/docs/api-references/businesses-id-reviews.md
    yelp.businesses(businessMatchYelp.businesses[0].id, function(error, data) {businessYelp=data;});


    //https://github.com/Yelp/yelp-api-v3/blob/master/docs/api-references/businesses-id.md
    yelp.businessesReviews(businessMatchYelp.businesses[0].id, function(error, data) {reviewsYelp=data;});

    while(businessYelp === undefined || reviewsYelp === undefined) {
        require('deasync').runLoopOnce();
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
