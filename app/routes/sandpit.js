var express = require('express');
var products = require('../data/products');

var router = express.Router();

router.get('/sandpit/api/products', function(req, res){
    res.send(JSON.stringify(products));  // return products resource
})

router.get('/sandpit/productCarousel', function(req,res){
   res.render('productCarousel', {
        pageTitle: 'Michae Park lunch bar',
        pageID: 'sandpitCarousel'
   }); 
});

module.exports = router;