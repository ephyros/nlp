/**
 * Created by garando on 3/22/17.
 */

var express = require('express');
var bodyParser = require('body-parser')
var bench = require('./bench.js');
var port = process.env.PORT;

var app = express();
var nodeAnalyzers = bench.nodeAnalyzers();

app.use(express.static('public'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.get('/',function(req,res){

  res.sendFile('public/index.html', { root: __dirname });


});

app.post('/sentiment', function (req, res) {

  var i = parseInt(req.body.type);
  var analyzer = nodeAnalyzers[i];
  var mark = analyzer(req.body.text);
  res.json({mark: mark});
});

app.listen(port);