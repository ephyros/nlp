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

app.set('view engine', 'ejs');

app.get('/',function(req,res){

  res.render('index', {path: req.route.path});

});

app.get('/bench',function(req,res){

  res.render('bench', {path: req.route.path});

});

app.post('/', function (req, res) {

  var i = parseInt(req.body.lib);
  var analyzer = nodeAnalyzers[i];
  var mark = analyzer(req.body.text);
  res.json({mark: mark});
});

app.post('/bench', function (req, res) {

  var i = parseInt(req.body.lib);
  var analyzer = nodeAnalyzers[i];
  var isPositive = req.body.type === "1";
  var reviews = bench.extractReviews(req.body.topic, isPositive ? 'positive' : 'negative');
  var benchmarks = bench.bench(analyzer, reviews, isPositive);
  res.json(benchmarks);
});

app.listen(port);