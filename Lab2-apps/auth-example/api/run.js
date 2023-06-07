var express = require('express');
var cors = require('cors');
var app = express();
app.use(cors());
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/login/:username/:password', function(request, response) {
    if(request.params.username=='admin' && request.params.password=='123'){
        response.json({status: 'ALLOW'});
    };
    response.json({status: 'DENY'});
});

app.listen(3000, function(){
    console.log('CORS-enabled web server is listening on port 3000...');
});