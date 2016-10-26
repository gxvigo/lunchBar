var express = require('express');

var router = express.Router();

router.get('/', function(req, res){
    res.render('index'); // this load ./views/index.ejs
});

module.exports = router;