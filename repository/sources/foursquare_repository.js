'use strict';
const context_common = require('../../helpers/common.js');

const jsonQuery = require('json-query')


module.exports = {
    get_foursquare(metadata) {
        let json;
        let request = require('request');
        request({
            url: 'https://api.foursquare.com/v2/venues/search',
            method: 'GET',
            qs: {
                client_id: 'A32K1QWL1TY4TTFSSQHQHSGWC0LC3QY5MGLDT5ZYFHPWFIDT',
                client_secret: '5HKEFHMEXLRDORXJ0AJEI31UZURUQN3ADTXREZE3FIH13MLT',
                ll: metadata.location.lat + ',' + metadata.location.lng,
                query: metadata.name,
                v: '20170801',
                radius: '200'
            }
        }, function (err, res, body) {
            if (err) {
                console.log('failed foursquare search' + err);
            } else {
                json = JSON.parse(body);
            }
        });
    
        while (!json) {
            require('deasync').sleep(250);
        }
    
    
        let foursquare_id = json.response.venues[0].id;;
        let json_photos;
        let json_tips;
        request({
            url: 'https://api.foursquare.com/v2/venues/' + foursquare_id + '/photos',
            method: 'GET',
            qs: {
                v: '20170801',
                client_id: 'A32K1QWL1TY4TTFSSQHQHSGWC0LC3QY5MGLDT5ZYFHPWFIDT',
                client_secret: '5HKEFHMEXLRDORXJ0AJEI31UZURUQN3ADTXREZE3FIH13MLT',
                group: "venue",
                limit: 8
            }
        }, function (err, res, body) {
            if (err) {
                console.log('failed foursquare photos ' + err);
            } else {
                json_photos = JSON.parse(body);
            }
        });
    
        request({
            url: 'https://api.foursquare.com/v2/venues/' + foursquare_id + '/tips',
            method: 'GET',
            qs: {
                v: '20170801',
                client_id: 'A32K1QWL1TY4TTFSSQHQHSGWC0LC3QY5MGLDT5ZYFHPWFIDT',
                client_secret: '5HKEFHMEXLRDORXJ0AJEI31UZURUQN3ADTXREZE3FIH13MLT',
                group: "venue",
                limit: 8
            }
        }, function (err, res, body) {
            if (err) {
                console.log('failed foursquare tips ' + err);
            } else {
                json_tips = JSON.parse(body);
            }
        });
    
    
        while (!json_photos || !json_tips) {
            require('deasync').sleep(250);
        }
    
    
        let retval = []
        try {
            retval.push({
                rating: 'N/A',
                number_of_reviews: 'N/A',
                source: 'foursquare',
                foursquare_id: foursquare_id,
                menu: {
                    url: json.response.venues[0].menu.mobileUrl
                }
            });
        }
        catch (e) {
            console.log("failed parse menu foursquare" + e.message + e.stack)
        }
    
    
        try {
            let photos = [];
            json_photos.response.photos.items.forEach((photo) => {
                photos.push({
                    url: photo.prefix + 'width223' + photo.suffix
                });
            })
        
            retval.push({
                rating: 'N/A',
                number_of_reviews: 'N/A',
                source: 'foursquare',
                foursquare_id: foursquare_id,
                photos: {
                    photos: photos
                }
            });
        }
        catch (e) {
            console.log("failed parse photos foursquare" + e.message + e.stack)
        }
    
    
        try {
            let reviews = [];
            let reviews_counter=0;
            json_tips.response.tips.items.slice(5).forEach((tip) => {
                if(tip.photo && reviews_counter<6){
                    reviews_counter++;
                    let review = {
                        time: tip.createdAt,
                        text: tip.text,
                        photo_url: tip.photo?tip.photo.prefix + 'width223' + tip.photo.suffix:undefined
                    };
                    reviews.push(review);
                }
            })
    
            retval.push({
                rating: 'N/A',
                number_of_reviews: 'N/A',
                source: 'foursquare',
                foursquare_id: foursquare_id,
                reviews: reviews
            });
    
        }
        catch (e) {
            console.log("failed parse reviews foursquare" + e.message + e.stack)
        }
    
    
        return retval;
    }
    
      
}
