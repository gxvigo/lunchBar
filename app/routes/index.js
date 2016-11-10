var express = require('express');
var openingHours = require('../data/openingHours'); // data file used just in this view
var currentTermMeals = require('../data/currentTermMeals'); // data file used just in this view
var priceBook = require('../data/priceBook'); // data file used just in this view

//console.log(JSON.stringify(currentTermMeals.meals));

var router = express.Router();

router.get('/', function(req, res){   
    res.render('index',{    // this load ./views/index.ejs passing a variable (object)
        pageTitle: 'Michae Park lunch bar',
        pageID: 'home',
        openingHours: openingHours,
        currentTermMeals: currentTermMeals,
        priceBook: priceBook
    }); 
});

module.exports = router;