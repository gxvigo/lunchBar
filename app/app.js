var express = require('express');
var app = express();
var reload = require('reload');

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs'); // set view engine
app.set('views', 'app/views'); // set custom root for view engine

app.use(express.static(__dirname + '/public'));
app.use(require('./routes/index'));

var server = app.listen(app.get('port'), function(){
   console.log('### express server listening on http://host:' + app.get('port')); 
});
 
reload(server, app);