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

// GET method API
router.get('/api/feedback', function(req, res){
    res.send(JSON.stringify(feedbackData));
});


// POST method API
router.post('/api/feedback', function (req, res) {
    feedbackData.feedback.unshift(req.body); // unshift push the element on top of the array

    fs.access('app/data/feedback.json', fs.F_OK, function (err) {
        if (err) {
            console.log("### feedbackApi.js - File feedback.json not found");
            res.status(500).send('Problem updating feedback file POST');
        }
    });

    fs.writeFile('app/data/feedback.json', JSON.stringify(feedbackData), 'utf8', function (err) {
        if(err) {
            console.log("### feedbackApi.js - Problem writing feedback.json, err: " + err);
        }
    })
    res.json(feedbackData);
});

// DELETE method API
router.delete('/api/feedback/:id', function(req, res) {
    console.log('### /api/feedback DELETE called, params: ' + req.params.id);
    
    fs.readFile('app/data/feedback.json', 'utf8', function(err, data){
        if(err){
            res.status(500).send('Problem fetching feedback file in DELETE');
        }
        console.log("### feedback.json obj " + data);
        var dataObj = JSON.parse(data);
        dataObj.feedback.splice(req.params.id,1);  // remove the element (at index id) from the array 
        fs.writeFile('app/data/feedback.json', JSON.stringify(dataObj), 'utf8', function (err) {  // persist back the file
            if(err) {
                console.log("### feedbackApi.js - Problem writing feedback.json, err: " + err);
            }
        })
        res.sendStatus('204'); // Resource deleted
    })
    
    
});

module.exports = router;