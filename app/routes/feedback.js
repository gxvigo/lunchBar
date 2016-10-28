var express = require('express');

var router = express.Router();

router.get('/feedback', function(req, res){   
    res.render('feedback',{    // this load ./views/feedback.ejs passing a variable (object)
        pageTitle: 'Michae Park lunch bar',
        pageID: 'feedback'
    }); 
});


module.exports = router;