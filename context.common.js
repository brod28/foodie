'use strict';

module.exports = {
    helper:{
        isInt:function (value) {
            return !isNaN(value) && 
                   parseInt(Number(value)) == value && 
                   !isNaN(parseInt(value, 10));
          }
    },
    http:{
        request_get(req){
            var source;
            let request = require('request');
            request({ 
                url:req.url,
                headers: req.headers
            }, function (error, response, body) {
                source = body;
                if(error==undefined || body=='' || response.statusCode!=200){
//                    console.log(error);
  //                  console.log(response);
    //                console.log(body);
                }
            });
            while(source === undefined) {
                require('deasync').runLoopOnce();
            }
            return source;
        },
        request_post(req){
            var source;
            let request = require('request');
            request.post({ 
                headers: req.headers,
                url:req.url,
                body:req.params
            }, function (error, response, body) {
                source = body;
                if(error==undefined || body=='' || response.statusCode!=200){
                 //   console.log(error);
                   // console.log(response);
                    //console.log(body);
                }
            });
            while(source === undefined) {
                require('deasync').runLoopOnce();
            }
            return source;
        }
    }
}