var express = require('express');

var router = express.Router();

router.get('/admin/feedback', function(req, res){   
    res.render('adminFeedback',{    // this load ./views/adminFeedback.ejs passing a variable (object)
        pageTitle: 'Michae Park lunch bar',
        pageID: 'adminFeedback'
    }); 
});


module.exports = router;