var express = require('express');

var router = express.Router();

router.get('/', function(req, res){   
    res.render('index',{    // this load ./views/index.ejs passing a variable (object)
        pageTitle: 'Michae Park lunch bar',
        pageID: 'home'
    }); 
});

module.exports = router;