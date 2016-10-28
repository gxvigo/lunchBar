var express = require('express');
var router = express.Router();

var feedbackData = require('../data/feedback.json');  // load data file with all feedback

router.get('/api/feedback', function(req, res){
    res.send(JSON.stringify(feedbackData));
})

module.exports = router;
