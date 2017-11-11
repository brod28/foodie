'use strict';
const context_common = require('../context.common.js');
const jsonQuery = require('json-query')


module.exports = {
    search(req){
        return get_google(req.name,req.location)
    }
}  

function get_google(name,location){
    let retVal=[];
    try{
        let get_request={
            url:'https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+name+'&types=establishment&location='+location+'&radius=500&key=AIzaSyC_jyDsWS4RloJpkkqctnIc8SVirGIYgjY'
        };
        let response=context_common.http.request_get(get_request)
        let json;
        json=JSON.parse(response);
        json.predictions.forEach(function(element) {
            let location={
                place_id:element.place_id,
                description:element.description
            };
            retVal.push(location);
        });
        }
    catch(e){
        console.log("failed to search in google error:"+e )
    }

    return retVal;
}
