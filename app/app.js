var express = require('express');
var reload = require('reload');

var app = express();


app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs'); // set view engine
app.set('views', 'app/views'); // set custom root for view engine

app.use(express.static(__dirname + '/public')); // configure static directory 
app.use(require('./routes/index')); // load index.ejs route
app.use(require('./routes/feedback')); // load feedback.ejs route
app.use(require('./routes/feedbackApi')); // load feedbackApi.ejs route
app.use(require('./routes/admin')); // load admin.ejs route 
app.use(require('./routes/sandpit')); // load sandpit routes

var server = app.listen(app.get('port'), function(){
   console.log('### express server listening on http://host:' + app.get('port')); 
});
 
reload(server, app);