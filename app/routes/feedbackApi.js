var express = require('express');
var bodyParser = require('body-parser');  // used to formatting the request (body)
var fs = require('fs');

var feedbackData = "";
fs.access('app/data/feedback.json', fs.F_OK, function (err) {  // check whehter feedbacl.json exist, if not it is created
    if (!err) { 
        feedbackData = require('../data/feedback.json');  // load data file with all feedback
    } else {
        console.log("### feedbackApi.js - File feedback.json not found");
        fs.writeFile('app/data/feedback.json', '{"feedback":[]}', function(err)  {
            if (err) { 
                console.log ("### feedbackApi.js - Error creating feedback.json file. Err: " + err);
            } else { 
                console.log("### feedbackApi.js - New empty file feedback.json created");
            } 
        });
    };
});

var router = express.Router();

router.use(bodyParser.json()); // used to properly parse JSON data (from POST)
router.use(bodyParser.urlencoded({ extended: false })); // create application/x-www-form-urlencoded, needed to understand form data

router.get('/api/feedback', function(req, res){
    res.send(JSON.stringify(feedbackData));
});


router.post('/api/feedback', function (req, res) {
    feedbackData.feedback.unshift(req.body); // unshift push the element on top of the array

    fs.access('app/data/feedback.json', fs.F_OK, function (err) {
        if (err) {
            console.log("### feedbackApi.js - File feedback.json not found");
            res.status(500).send('Problem updating feedback file');
        }
    });

    fs.writeFile('app/data/feedback.json', JSON.stringify(feedbackData), 'utf8', function (err) {
        if(err) {
            console.log("### feedbackApi.js - Problem writing feedback.json, err: " + err);
        }
    })
    res.json(feedbackData);
})

module.exports = router;