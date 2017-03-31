/**
 * Created by garando on 3/22/17.
 */

var express = require('express');
var bodyParser = require('body-parser');
var bench = require('./bench.js');
var inspect = require('util').inspect;
var _ = require('lodash');

require('dotenv').config();
var port = process.env.PORT;

var app = express();
var nodeAnalyzers = bench.nodeAnalyzers();

app.use(express.static('public'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies

app.set('view engine', 'ejs');

app.get('/', function (req, res) {

  res.render('index', {path: req.route.path
    , form: {lib: "0"}
  });

});

app.get('/bench', function (req, res) {

  res.render('bench', {path: req.route.path, form:
    {
      lib: "0",
      topic: "books",
      type: "1"
    }});

});

app.get('/apis', function (req, res) {

  res.render('apis', {path: req.route.path, form: {
    lib: "0"
  }});

});

app.get('/client', function (req, res) {

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

  res.render('bench', {path: req.route.path, benchmarks: benchmarks, form: req.body});
});

app.post('/apis', function (req, res) {

  var i = parseInt(req.body.lib);
  var analyzer = bench.apiAnalyzers()[i];
  analyzer(req.body.text, function (error, response, body) {
    // console.log(inspect(response , { colors: true, depth: 2 }));
    var remains;
    var probability;
    var label;
    var parsed = JSON.parse(body.replace('\n', ''));
    function probabilityToPercents() {
      probability = Math.round(probability * 100);
    }
    if (i == 0) { // japerk
      label = parsed.label;
      probability = parsed.probability[label];
      probabilityToPercents();
      remains = response.headers["x-ratelimit-queries-remaining"];
    } else if (i == 1) { // skyttle
      var scores = parsed.docs[0]["sentiment_scores"];
      label = _.maxBy(_.keys(scores), function (o) { return scores[o]; });
      probability = scores[label];
      remains = response.headers["x-ratelimit-requests-remaining"];
    } else if (i == 2) { // webknox
      probability = parsed.document.confidence;
      probabilityToPercents();
      label = parsed.document.sentimentWithNeutral.substring(0,3);
      remains = response.headers["x-ratelimit-requests-remaining"];
    }
    res.render('apis', {
      path: req.route.path,
      probability: probability,
      label: label,
      remains: remains,
      form: req.body
    });
  });
});

app.listen(port);