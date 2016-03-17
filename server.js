var express = require('express');

var app = express();

app.use('/public', express.static(__dirname + '/public'));

app.all('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
});

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

app.listen(3000, function () {
    console.log('Server listening at port 3000');
});