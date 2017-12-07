'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const repositor_review = require('./repository/review.js');
const repositor_location = require('./repository/location.js');
const context_common = require('./helpers/common.js');
const restService = express();

restService.use(bodyParser.json());

// use res.render to load up an ejs view file


restService.use('/static', express.static('assets'))

restService.get('/api/check_image', function (req, res) {

    let Tesseract = require('tesseract.js')
   /*
    Tesseract.recognize('assets/image-text1.jpg')
        .then(function (result) {
            console.log(result)
        })
        .catch(function (e) {
            console.log(e)
        })
   */
  
    Tesseract.recognize("assets/image-text1.jpg", {
        lang: 'eng',
        tessedit_char_blacklist: 'e'
    })
        .progress(function (message) { 
            console.log(message) 
        })
        .then(function (result) { 
            console.log(result) 
        }) 
        .catch(function (e) { 
            console.log(e) 
        });
});


restService.get('/api/ext_config', function (req, res) {
    let retVal=[{
        type:"include",
        pattern:'restaurant',
        text:'Check It'
    }];
    
    res.json({ data: retVal });
});    
restService.get('/api/search', function (req, res) {
       console.log("request search with for " + req.param('name'))
    let request = {
        name: req.param('name').replace(new RegExp("[0-9]?[0-9]?[0-9]?[0-9]?[0-9]."), "").replace(new RegExp("[0-9]?[0-9]?[0-9]?[0-9]?[0-9] ."), ""),

    };
    let retVal = repositor_location.search(request);
    res.json({ data: retVal });
});


restService.get('/api/tracer', function (req, res) {
    console.log("trace " + req.param('query'))
    var decode = require('decode-html');
    
    
   
    let query = decode(req.param('query')).split(',');

    query.forEach((element)=>{
            let request = {
                name: element,
            };
            element.search=repositor_location.search(request);
        }
    );
    res.json({ data:query });

});

restService.get('/api/reviews', function (req, res) {


    console.log("request review with for " + req.param('name'))
    let request = {
        name: req.param('name')
    };
    let retVal = repositor_review.get_reviews(request);

    // console.log("request review end with " + JSON.stringify(retVal))
    res.json(retVal);
});

const path = require('path');
// Serve static files from the React app
restService.use(express.static(path.join(__dirname, 'client/build')));


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
restService.get('*', (req, res) => {
    console.log("request react")
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});


/* */
restService.listen((process.env.PORT || 5000), function () {
    console.log("Server listening");
    var env = process.env.NODE_ENV || 'dev';
    if (env == 'dev') {
        // if dev envierment call to the test method
        /*        const https = require('https');
                https.get('http//127.0.0.1:5000/hook', (resp) => {        
                }).on("error", (err) => {
                    console.log("Error: " + err.message);
                });        */
    }
});
/*

let benivo_source_code=[];


//ES 1
for(i=0;i<benivo_source_code.length;i++){
    console.log(benivo_source_code[i]+ ' - Made in Armenia !!!')
}

// ES 5.1
benivo_source_code.foreach(function(line){
    console.log(line + ' - Made in Armenia !!!')
})

// ES 6
benivo_source_code.foreach((line)=>{
    console.log(`${line} - Made in Armenia !!!`)
})



var fs = require('fs');
var libxmljs = require("libxmljs");
var xml = fs.readFileSync('./data/XMLS/ZillowNeighborhoods-MI.kml', 'utf8'); 
var xmlDoc = libxmljs.parseXml(xml);
let oldName='';
let file='';


xmlDoc.root().childNodes()[1].childNodes()[7].childNodes().forEach((place)=>{
    if(place.toString().startsWith('<Placemark>')){
        place.node('name',place.childNodes()[3].childNodes()[1].childNodes()[7].text());
        place.addChild(place.childNodes()[5]);
        if(oldName!=''){
            file=file+`
            update MarketEducationArea 
            set Area='${place.childNodes()[3].childNodes()[1].childNodes()[7].text()}'
            where Area='${oldName}'
            `
        }
        oldName=place.childNodes()[3].childNodes()[1].childNodes()[7].text();        
    }
})
var p=1;
fs.writeFile("./data/XMLS/ZillowNeighborhoods-CA_new.kml", xmlDoc.toString(), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 

fs.writeFile("./data/XMLS/replace-MI.txt", file, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 

*/
/*
var fs = require('fs');

function distance(number) {
    let commuteMethods = ['transit ', 'driving']
    let data = require(`./data/calculation_of_distance/response${number}.js`);
    console.log("got json")
    
    data.sort(function (a, b) {
        return a.office_id - b.office_id;
    });

    console.log("sort json")
    


    let count = 0;
    let pre_office_id = -1;
    let current_request = [];
    let requests = [];
    let no_requests=[];
    console.log("start prepare request")
    
    data.forEach((element) => {
        if (!element.drive_time || element.drive_time == -1 || !element.transit_time || element.transit_time == -1) {
            if ((pre_office_id != element.office_id || count > 9) && pre_office_id != -1) {
                count = 0;
                requests.push(current_request);
                current_request = [];
            }
            pre_office_id = element.office_id;
            if (!element.drive_time) {
                element.drive_time = -1;
            }
            if (!element.transit_time) {
                element.transit_time = -1;
            }
            count++;
            current_request.push(element);
        }
        else{
            no_requests.push(element);
        }
    })
    if (current_request.length > 0) {
        requests.push(current_request);
    }
    console.log("requests number : " +requests.length)
    console.log("no_requests number : " +no_requests.length)
    
    let trasit = false;
    let driving = false;
    let new_request = [];
    requests.forEach((element, index) => {
        console.log("requests number " +index+" in progress out of "+requests.length);
        try {
            let request_org = `${element[0].office_lon},${element[0].office_lat}`;
            let request_des = ``;
            element.forEach((element1) => {
                request_des = request_des + `${element1.area_lon},${element1.area_lat}|`;
            });
            // AIzaSyDOMF8dXSMzhIPg5OStKyqZpIIrgrvHAus - dima new account
            // AIzaSyDqOmpoxyKg5R-_MQqiDBhWAuiffnRxb_Y - dima another
            // AIzaSyC2-_IL-lOjwUaiJJmms7oEUp2wGXMnH4U
            // AIzaSyAraN1X7dcD2ZKsT5uP1sBGEz8crQb8M50
            // AIzaSyDyNc2IuC3XMfbzu-29fgD1goVcjIxg9bg - dima benivo
            let token='AIzaSyAraN1X7dcD2ZKsT5uP1sBGEz8crQb8M50'
            element.url_drive = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${request_org}&destinations=${request_des}&mode=driving&language=fr-FR&key=`+token;
            element.url_transit = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${request_org}&destinations=${request_des}&mode=transit&language=fr-FR&key=`+token;
            var request = require('request');
            request(element.url_drive, function (error, response, body) {
                //            console.log('error:', error); // Print the error if one occurred
                //            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                //            console.log('body:', body); // Print the HTML for the Google homepage.
                try {
                    let response_drive = JSON.parse(body);
                    if (response_drive.status == "OK") {
                        element.forEach((element1, i) => {
                            if (response_drive.rows[0].elements[i].duration) {
                                element1.drive_time = response_drive.rows[0].elements[i].duration.value;
                            }
                            else {
                                console.log("no duration drive")
                            }
                        });
                    }
                    else {
                        console.log("status is not ok drive status "+response_drive.status)
                    }
                }
                catch (ex) {
                    console.log('driver index ' + index + " ex " + ex);
                    element.error_drive = ex;
                }

                if (index >= requests.length - 1) {
                    driving = true;
                }
            });
            require('deasync').sleep(145);
            request(element.url_transit, function (error, response, body) {
                //            console.log('error:', error); // Print the error if one occurred
                //            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                //            console.log('body:', body); // Print the HTML for the Google homepage.
                try {
                    let response_transit = JSON.parse(body);
                    if (response_transit.status == "OK") {
                        element.forEach((element1, i) => {
                            if (response_transit.rows[0].elements[i].duration) {
                                element1.transit_time = response_transit.rows[0].elements[i].duration.value;
                            }
                            else {
                                console.log("no duration transit")
                            }
                        });
                    }
                    else {
                        console.log("status is not ok  transit status:"+response_transit.status)
                    }
                }
                catch (ex) {
                    console.log('transit index ' + index + " ex " + ex);
                    element.error_trasit = ex;
                }
                if (index >= requests.length - 1) {
                    trasit = true;
                }
            });
            require('deasync').sleep(145);
        }
        catch (ex) {

            console.log(ex);
            element.error = ex;
        }
    });
    while (!trasit || !driving) {
        require('deasync').sleep(3000);
    }
    console.log("finished request and going to save to file");
    
    requests.forEach((element) => {
        element.forEach((element1) => {
            if (element.error) {
                element1.error = element.error;
            }
            if (element.error_drive) {
                element1.error_drive = element.error_drive;
            }
            if (element.error_trasit) {
                element1.error_trasit = element.error_trasit;
            }
            new_request.push(element1);
        });
    });
    let all = new_request.concat(no_requests);
     
    fs.writeFile(`./data/XMLS/result-${number}.json`, JSON.stringify(all), function (err) {
        if (err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });

}



function upsert(number) {
    
    let commuteMethods = ['transit ', 'driving']
    let data = require(`./data/calculation_of_distance/response${number}.js`);
    console.log("got json")
    
    data.forEach((element) => {
        let insert=`insert into MarketEducationAreaAddressRef(AddressId,MarketEducationAreaId,CommuteTimePublicTransport,CommuteTimeCar,CommuteTimeBike)
                values(${element.office_id},${element.area_id},${element.transit_time},${element.drive_time},${element.drive_time*2});
                `;
        statement.push(insert);      
        let update=`
        update MarketEducationAreaAddressRef
        set CommuteTimeCar=${element.drive_time} ,CommuteTimePublicTransport=${element.transit_time},CommuteTimeBike=${element.drive_time*2}
        where AddressId=${element.office_id} and MarketEducationAreaId=${element.area_id};
        `;
        statement.push(update);      
    });
}

let statement=[]

upsert('.1');
upsert('.2');
upsert('.3');
upsert('.4');
upsert('.5');
upsert('.6');
upsert('.7');
upsert('.8');
upsert('.9');
upsert('.10');
upsert('.11');
upsert('.12');

//['.7','.8'].forEach((element) => {
//})

fs.writeFile(`./data/XMLS/upsert.txt`, statement.join(''), function (err) {
    if (err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});

*/