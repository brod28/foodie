'use strict';
const context_common = require('../helpers/common.js');
const locationRepository = require('./location.js');
const jsonQuery = require('json-query')


module.exports = {
    get_reviews(request) {
        // creating object to return
        let retVal = {
            metadata: undefined,
            reviews: []
        }

        // making search for sepecific location
        let GoogleLocationInformation;
        let GoogleLocationBasicInformation;
        try {
            GoogleLocationBasicInformation = locationRepository.search({ name: request.name })[0];
        }
        catch (e) {
            console.log("google for " + request.name + " search did work error:" + e.message + e.stack)
        }
        //get all the reviews
        if (GoogleLocationBasicInformation != undefined) {

            // get google reviews
            try {
                // update not just review but also metadata
                GoogleLocationInformation = get_google(GoogleLocationBasicInformation);
                retVal.metadata = GoogleLocationInformation.metadata;
                retVal.reviews.push(GoogleLocationInformation.reviews);
            }
            catch (e) {
                console.log("google for " + request.name + " reviews did work error:" + e.message + e.stack)
            }
            console.log('start get data '+new Date().getSeconds()); 
            let promises = [];
            let IsPromisesDone = false;
            // get yelp reviews
            promises.push(new Promise(function (resolve, reject) {
                setTimeout(function () {
                    console.log("start yelp");                    
                    try {
                        let yelp_review = get_yelp(GoogleLocationInformation.metadata)
                        retVal.reviews.push(yelp_review);
                    }
                    catch (e) {
                        console.log("yelp for " + request.name + "reviews did work error:" + e.message + e.stack)
                    }
                    console.log("end yelp");                    
                    resolve('Success!');
                }, 1)
            }));

            // get  zomato reviews
            promises.push(new Promise(function (resolve, reject) {
                setTimeout(function () {
                    console.log("start zomato");                    
                    try {
                        let zomato_review = get_zomato(GoogleLocationInformation.metadata)
                        retVal.reviews.push(zomato_review);
                    }
                    catch (e) {
                        console.log("zomato for " + request.name + "reviews did work error:" + e.message + e.stack)
                    }
                    resolve('Success!');
                    console.log("end zomato");                    
                }, 10)
            }));

            // get facebook/instagram reviews
            promises.push(new Promise(function (resolve, reject) {
                setTimeout(function () {
                    console.log("start facebook");
                    try {
                        let facebook_instagram_review = get_facebook_instagram(GoogleLocationInformation.metadata)
                        retVal.reviews = retVal.reviews.concat(facebook_instagram_review);
                    }
                    catch (e) {
                        console.log("facebook for " + request.name + "reviews did work error:" + e.message + e.stack)
                    }
                    console.log("done facebook");
                    resolve('Success!');
                }, 10)
            }));

            promises.push(new Promise(function (resolve, reject) {
                setTimeout(function () {
                    console.log("start rest");                                        
                    try {
                        let rest_review = get_rest(GoogleLocationInformation.metadata)
                        retVal.reviews = retVal.reviews.concat(rest_review);
                    }
                    catch (e) {
                        console.log("rest for " + request.name + "reviews did work error:" + e.message + e.stack)
                    }
                    console.log("end rest");                                        
                    resolve('Success!');
                }, 10)
            }));

            promises.push(new Promise(function (resolve, reject) {
                setTimeout(function () {
                    console.log("start NYC");                                        
                    try {
                        let NYC_review = get_NewTimes(GoogleLocationInformation.metadata);
                        if (NYC_review) {
                            retVal.reviews.push(NYC_review);
                        }
                    }
                    catch (e) {
                        console.log("NYT for " + request.name + "reviews did work error:" + e.message + e.stack)
                    }
                    resolve('Success!');
                    console.log("end NYC");                                        
                }, 10)
            }));

            Promise.all(promises).then(function (results) {
                IsPromisesDone = true;
            })

            while (!IsPromisesDone) {
                require('deasync').sleep(250);
            }
            
            console.log('end  get data '+new Date().getSeconds()); 
        }
        else {
            console.log("google for " + request.name + " didn't find anything")
        }
        return retVal;
    }
}

// return reviews but also the metadata
function get_google(GoogleLocationInformation) {
    // get information for location from google 
    let get_request = {
        url: 'https://maps.googleapis.com/maps/api/place/details/json?placeid=' + GoogleLocationInformation.place_id + '&key=AIzaSyC_jyDsWS4RloJpkkqctnIc8SVirGIYgjY'
    };

    let response;
    let json;
    try {
        response = context_common.http.request_get(get_request)

    }
    catch (e) {
        console.log("call to google failed url " + get_request.url + " error " + e.message + e.stack);
        throw e;
    }
    try {
        json = JSON.parse(response);
    }
    catch (e) {
        console.log("failed to parse google response " + response + " error " + e.message + e.stack);
        throw e;
    }
    // parse reviews to correct structure
    let reviews = [];
    json.result.reviews.forEach(function (element) {
        let review = {
            rating: element.rating,
            time: element.relative_time_description,
            text: element.text
        };
        reviews.push(review);
    });


    // build return object
    let retval =
        {
            reviews: {
                rating: json.result.rating,
                number_of_reviews: 'N/A',
                source: 'google',
                reviews: reviews,
                review_article: undefined
            },
            metadata: {
                google_id: GoogleLocationInformation.place_id,
                address: json.result.formatted_address,
                name: json.result.name,
                phone_number: json.result.formatted_phone_number,
                area_near: json.result.vicinity,
                description: GoogleLocationInformation.description,
                website: json.result.website,
                location: {
                    lat: json.result.geometry.location.lat,
                    lng: json.result.geometry.location.lng
                }
            }
        }
    return retval;
}

function get_yelp(metadata) {
    // get token from yelp
    let access_token;
    try {
        let post_request = {
            url: 'https://api.yelp.com/oauth2/token',
            params: 'grant_type=client_credentials&client_id=vQaZSE0GZuZ6YJSIkieYfQ&client_secret=VqGj4unXZ7ReKIeLuZkrdYwimu1N4QMySUqhT5SnftivSIerMk7OLyNyVzNGJ8tJ'
        };
        let token = context_common.http.request_post(post_request);
        access_token = JSON.parse(token).access_token;
    }
    catch (e) {
        console.log("failed toget token for yelp error " + e.message + e.stack);
        throw e;
    }


    var Yelp = require('yelp-v3');

    var yelp = new Yelp({
        access_token: access_token,
    });

    let businessMatchYelp;
    // serch for yelp business id
    try {
        yelp.search({
            term: metadata.name,
            location: metadata.area_near,
        },
            function (error, data) {
                businessMatchYelp = data;
            }
        );

        while (businessMatchYelp === undefined) {
            require('deasync').runLoopOnce();
        }
    }
    catch (e) {
        console.log("failed yelp search " + e.message + e.stack);
        throw e;
    }

    let businessYelp;
    let reviewsYelp;
    // search for yelp business details and reviews (2 different calls)
    try {
        //https://github.com/Yelp/yelp-api-v3/blob/master/docs/api-references/businesses-id-reviews.md
        yelp.businesses(businessMatchYelp.businesses[0].id, function (error, data) { businessYelp = data; });


        //https://github.com/Yelp/yelp-api-v3/blob/master/docs/api-references/businesses-id.md
        yelp.businessesReviews(businessMatchYelp.businesses[0].id, function (error, data) { reviewsYelp = data; });

        while (businessYelp === undefined || reviewsYelp === undefined) {
            require('deasync').runLoopOnce();
        }
    }
    catch (e) {
        console.log("failed yelp get business data or reviews " + e.message + e.stack);
        throw e;
    }

    let reviews = [];
    reviewsYelp.reviews.forEach(function (element) {
        let review = {
            rating: element.rating,
            time: element.time_created,
            text: element.text
        };
        reviews.push(review);
    });


    let retval =
        {
            rating: businessYelp.rating,
            number_of_reviews: businessYelp.review_count,
            source: 'yelp',
            yelp_id: businessMatchYelp.businesses[0].id,
            reviews: reviews,
            review_article: undefined
        }
    return retval;
}

function get_zomato(metadata) {
    // get token from yelp
    let zomato_search_result;
    try {
        let request_get = {
            url: 'https://developers.zomato.com/api/v2.1/search?q=' + metadata.name + '&lat=' + metadata.location.lat + '&lon=' + metadata.location.lng,
            headers: { "user-key": "448f12a4c9e58334058a96bf10c16cbd" }
        };
        let response = context_common.http.request_get(request_get);
        zomato_search_result = JSON.parse(response);
    }
    catch (e) {
        console.log("search failed zomato error " + e.message + e.stack);
        throw e;
    }
    let zomato_restaurant = zomato_search_result.restaurants[0].restaurant;
    let zomato_review_result;
    try {
        let request_get = {
            url: 'https://developers.zomato.com/api/v2.1/reviews?res_id=' + zomato_restaurant.id,
            headers: { "user-key": "448f12a4c9e58334058a96bf10c16cbd" }
        };
        let response = context_common.http.request_get(request_get);
        zomato_review_result = JSON.parse(response);
    }
    catch (e) {
        console.log("review failed zomato error "+ e.message + e.stack);
        throw e;
    }

    let reviews = [];
    zomato_review_result.user_reviews.forEach(function (element) {
        let review = {
            rating: element.review.rating,
            time: element.review.review_time_friendly,
            text: element.review.review_text
        };
        reviews.push(review);
    });


    let retval =
        {
            rating: zomato_restaurant.user_rating.aggregate_rating,
            number_of_reviews: zomato_restaurant.user_rating.votes,
            source: 'zomato',
            zomato_id: zomato_restaurant.id,
            reviews: reviews,
            review_article: undefined
        }
    return retval;
}

function get_facebook_instagram(metadata) {
    let access_token;

    // get token from facebook
    try {
        let request_get = {
            url: 'https://graph.facebook.com/oauth/access_token?client_id=516944261669392&client_secret=b23a21594bdaf96bbe1e2b4b96f744e0&grant_type=client_credentials'
        };
        let response = context_common.http.request_get(request_get);
        access_token = JSON.parse(response).access_token;
    }
    catch (e) {
        console.log("access token failed facebook error " + e.message + e.stack);
        throw e;
    }

    let facebook_id;
    // facebook search for  business id
    try {
        let request_get = {
            url: 'https://graph.facebook.com/search?type=place&q=' + metadata.name + '&center=' + metadata.location.lat + ',' + metadata.location.lng + '&distance=1000&fields=name,checkins,picture&access_token=' + access_token
        };
        let response = context_common.http.request_get(request_get);
        facebook_id = JSON.parse(response).data[0].id;
    }
    catch (e) {
        console.log("search failed facebook error " + e.message + e.stack);
        throw e;
    }
    let facebook_data;
    try {
        let request_get = {
            url: 'https://graph.facebook.com/v2.11/' + facebook_id + '?fields=name,checkins,picture,overall_star_rating,photos,rating_count&access_token=' + access_token
        };
        let response = context_common.http.request_get(request_get);
        facebook_data = JSON.parse(response);
    }
    catch (e) {
        console.log("get info failed facebook error " + e.message + e.stack);
        throw e;
    }

    let retval = [];
    retval.push({
        rating: facebook_data.overall_star_rating,
        number_of_reviews: facebook_data.rating_count,
        source: 'facebook',
        facebook_id: facebook_id,
        reviews: [],
        review_article: undefined
    })
    retval.push({
        rating: undefined,
        number_of_reviews: undefined,
        source: 'instagram',
        instagram_id: facebook_id,
        reviews: [],
        review_article: undefined,
        photos: {
            url: 'https://www.instagram.com/explore/locations/'+facebook_id+'/'
        }
    })
    return retval;
}


function get_rest(metadata) {
    // get token from yelp
    let google_search_result;
    try {
        //no facebook
        let request_get = {
            url: 'https://www.googleapis.com/customsearch/v1?key=AIzaSyAZnGD9oKSiQxQdBBSDRRMSAqvDg__sfgQ&cx=008786984061848902811:9tp-ocrbvdw&q=' + metadata.description + ' Rating'
        };
        let response = context_common.http.request_get(request_get);
        google_search_result = JSON.parse(response);

        //facebook
        request_get = {
            url: 'https://www.googleapis.com/customsearch/v1?key=AIzaSyAZnGD9oKSiQxQdBBSDRRMSAqvDg__sfgQ&cx=008786984061848902811:eq7nh5o0slm&q=' + metadata.description + ' Rating'
        };
        response = context_common.http.request_get(request_get);
        google_search_result.items = google_search_result.items.concat(JSON.parse(response).items);

    }
    catch (e) {
        console.log("search failed google error " + e.message + e.stack);
        throw e;
    }

    let tripadviser_id = google_search_result.items[0].formattedUrl.split("g")[1].split('-')[0];
    let tripadviser_result;
    try {
        let request_get = {
            url: 'http://api.tripadvisor.com/api/partner/2.0/location/' + tripadviser_id + '?key=',
            headers: { "X-TripAdvisor-API-Key": "" }

        };
        let response = context_common.http.request_get(request_get);
        tripadviser_result = JSON.parse(response);
    }
    catch (e) {
        console.log("failed tripadviser error " + e.message + e.stack);
        throw e;
    }
    // in case one of the values is NOT int throw exception 
    let retVal = [];
    let includes = [];
    google_search_result.items.forEach(function (element) {
        if (!element.displayLink.includes("yelp")
            && !element.displayLink.includes("zomato")
            && !includes.includes(element.displayLink)) {
            try {
                let rating;
                let number_of_reviews = "N/A";
                try {
                    rating = element.snippet.split('rated ')[1].split(' ')[0];
                    number_of_reviews = element.snippet.split('See ')[1].split(' ')[0];
                    if (!context_common.helper.isFloat(rating)) {
                        rating = undefined;
                    }
                    if (!context_common.helper.isFloat(number_of_reviews)) {
                        number_of_reviews = "N/A";
                    }
                }
                catch (e) {
                    console.log("rest htmlSnippet parse rating failed for " + element.displayLink)
                }

                if (element.pagemap) {
                    if (element.pagemap.aggregaterating) {
                        if (element.pagemap.aggregaterating[0]) {
                            rating = element.pagemap.aggregaterating[0].ratingvalue;
                            number_of_reviews = element.pagemap.aggregaterating[0].ratingcount;
                        }
                    }
                }
                if (rating) {
                    includes.push(element.displayLink);
                    let obj = {
                        rating: rating,
                        number_of_reviews: number_of_reviews,
                        source: element.displayLink,
                        id: 0,
                        reviews: [],
                        review_article: undefined
                    }
                    retVal.push(obj);
                }
            }
            catch (e) {
                console.log("rest parse rating failed for " + element.displayLink)
            }
        }
    })
    return retVal;
}

function get_NewTimes(metadata) {
    let retval;
    let array_reviews_NYT = [];
    try {
        let fs = require('fs');
        let json = JSON.parse(fs.readFileSync('./data/NYtimes_in_NYC.json', 'utf8'));
        json.data.forEach(function (element) {
            array_reviews_NYT = array_reviews_NYT.concat(element.results);
        })
        array_reviews_NYT = { data: array_reviews_NYT };
    }
    catch (e) {
        console.log("NYT file doesn't load " + metadata.description);
        throw 'error';
    }
    let NYT_restaurant = jsonQuery('data[**][name=' + metadata.name + ']',
        { data: array_reviews_NYT }
    ).value;
    if (NYT_restaurant) {
        retval = {
            rating: 'N/A',
            number_of_reviews: 'N/A',
            source: 'New York Times',
            zomato_id: 0,
            reviews: [],
            review_article: {
                url: NYT_restaurant.review,
                summary: NYT_restaurant.summary,
                by: NYT_restaurant.editors_notes
            }
        }
    }
    return retval;
}
