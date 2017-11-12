'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const repositor_review = require('./repository/review.js');
const repositor_location = require('./repository/location.js');
const context_common = require('./helpers/common.js');
const restService = express();

restService.use(bodyParser.json());
 
// set the view engine to ejs
restService.set('view engine', 'ejs');

// use res.render to load up an ejs view file


restService.use('/static', express.static('assets'))



restService.get('/api/search', function(req, res) {
    console.log("request search with for " + req.param('name'))
    let request={
        name:req.param('name'),
        
    };
    let retVal=repositor_location.search(request);
    res.json({data:retVal});
});

restService.get('/api/reviews',function(req,res) {
    
     
     console.log("request review with for " + req.param('name'))
     let request={
         name:req.param('name')        
     };
     let retVal=repositor_review.get_reviews(request);
 
     console.log("request review end with " + JSON.stringify(retVal))
     res.json(retVal);
 });

// index page 
restService.get('/search', function(req, res) {
    console.log("request search with for " + req.param('name'))
    let request={
        name:req.param('name'),
        
    };
    let retVal=repositor_location.search(request);
    console.log("request review end with " +JSON.stringify(retVal))
    if(retVal.length==1){
        res.redirect('/reviews?name='+retVal[0].description);        
    }
    else{
        res.render('pages/search',{data:retVal});
    }
});



restService.get('/reviews',function(req,res) {
   
    
    console.log("request review with for " + req.param('name'))
    let request={
        name:req.param('name')        
    };
    let retVal=repositor_review.get_reviews(request);

    console.log("request review end with " + JSON.stringify(retVal))
    res.render('pages/reviews',retVal);

});
/* */
restService.listen((process.env.PORT || 5000), function () {
    console.log("Server listening");
    var env = process.env.NODE_ENV || 'dev';
    if(env=='dev'){
        // if dev envierment call to the test method
/*        const https = require('https');
        https.get('http//127.0.0.1:5000/hook', (resp) => {        
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });        */
    }
});

