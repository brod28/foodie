'use strict';
const context_common = require('../../helpers/common.js');

const jsonQuery = require('json-query')


module.exports = {
    get_yelp(metadata) {
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
      
}
