var express = require('express');
var app = express();
var path = require('path')

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.use(express.static('client/build'));


var server = app.listen(2784, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('es2015 webpack site running at http://%s:%s', host, port);
});
