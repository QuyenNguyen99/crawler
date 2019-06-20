process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const express = require('express');
var GlobalPdf = require('./core/global_pdf');
var GlobalFile = require('./core/global_file');
var bodyParser = require('body-parser');
var fs = require('fs');
var http = require('http');
var app = express();

app.use(bodyParser({ limit: '50mb' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/test', function(req, res) {
    res.send({
      code    : 200,
    });
})

app.post('/msbpdf', function(req, res) {
  var attributes = req.body;
  var time = new Date().getTime();
  var link_save = 'C:/project/cybermsb/pdf/' + time + '.pdf';
  var content = GlobalFile.readFile('C:/project/cybermsb/landingpages/maritimebank/index.html');
  GlobalPdf.createFile(content, link_save, attributes).then(r => {
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=' + attributes.id + '.pdf');
    var file = fs.createReadStream(link_save);
    var content = GlobalFile.readFile(link_save);
    file.pipe(res);
    setTimeout(function(){
      GlobalFile.removeFile(link_save);
    }, 1000);
  })
})

app.get('/pdf', function(req, res) {
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=' + req.query.id + '.pdf');
  
  var link_save = 'C:/project/cybermsb/pdf/' + req.query.id + '.pdf';
  var file = fs.createReadStream(link_save);
  // var content = GlobalFile.readFile(link_save);
  file.pipe(res);
})

var port = 6300;
var server = app.listen(port, function () {
  var host = server.address().host
  host = host ? host : 'localhost';
  var port = server.address().port

  console.log("Ung dung Node.js dang lang nghe tai dia chi: http://%s:%s", host, port)

})