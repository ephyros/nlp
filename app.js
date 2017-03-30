/**
 * Created by garando on 3/22/17.
 */

var express = require('express');
var bodyParser = require('body-parser')
var bench = require('./bench.js');
require('dotenv').config()
var port = process.env.PORT;

var app = express();
var nodeAnalyzers = bench.nodeAnalyzers();

app.use(express.static('public'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.set('view engine', 'ejs');

app.get('/',function(req,res){

  res.render('index', {path: req.route.path});

});

app.get('/bench',function(req,res){

  res.render('bench', {path: req.route.path});

});

app.get('/apis',function(req,res){

  res.render('apis', {path: req.route.path});

});

app.get('/client',function(req,res){

  res.render('client', {path: req.route.path});

});

app.post('/', function (req, res) {

  var i = parseInt(req.body.lib);
  var analyzer = nodeAnalyzers[i];
  var mark = analyzer(req.body.text);

  res.render('index', {path: req.route.path, mark: mark, form: req.body});
});

app.post('/bench', function (req, res) {

  var i = parseInt(req.body.lib);
  var analyzer = nodeAnalyzers[i];
  var isPositive = req.body.type === "1";
  var reviews = bench.extractReviews(req.body.topic, isPositive ? 'positive' : 'negative');
  var benchmarks = bench.bench(analyzer, reviews, isPositive);
  res.json(benchmarks);
});

app.post('/apis', function (req, res) {

  var i = parseInt(req.body.lib);
  var analyzer = bench.apiAnalyzers()[i];
  analyzer(req.body.text, function (error, response, body) {
    console.log("response: " + response);
    res.json(response);
  });
});

app.listen(port);