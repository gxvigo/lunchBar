$(document).ready(function(){
//    console.log("### productsCarousel ready");
    $("#productsCarousel").html("Hello world!");
    
    $.get('http://localhost:3000/sandpit/api/products', function(data){
        
        var products = [];
        var productsListItems = '';
        var dataProducts = JSON.parse(data);
        
        for (key in dataProducts.products){     // load products (objects list) into an array.
                                                // this is not necessary, the productsListItems
                                                // could have been built here, I did for learnig purpose
            if (dataProducts.products.hasOwnProperty(key)) {  // this tests whether the property is from the original source
                                                              // (file) or addedd by additional code (polluted)
                products.push(dataProducts.products[key]);
            }
        }
        
        
        for(var i=0; i < products.length; i++){   
            productsListItems += `
                <li>
                    <h2>${products[i].mealName}</h2>
                    <h3>${products[i].dietaryRestrictions}</h3>
                    <img src="/images/food/${products[i].image}" alt="image">
                    <h3>Ingridients</h3>
                    <p>${products[i].ingridients}</p>
                </li>
                `; 
        }
        
        
        $("#productsCarousel").html(productsListItems);
        
        
        $('#productsCarousel').cycle({
            fx:      'turnDown',
            delay:   -4000
        });
        
        
    })
        .fail(function(){
            console.log("### Problem calling /api/products from productsCarousel");
    });
    
});
    