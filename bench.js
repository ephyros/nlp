var fs = require('fs');
var parse = require('xml-parser');
var _ = require('lodash');
var sentiment = require('sentiment');
var ml = require('ml-sentiment')();
var analyze = require('Sentimental').analyze;
var request = require('request');


function bench(f, reviews, isPositive) {
  var hits = 0, total = 0;
  var d = new Date();
  _.each(reviews, function(review) {
    // console.log(sentim3(review))
    var score = f(review);
    if((!isPositive && score <= 0) || (isPositive && score >= 0)) {
      hits ++;
    }
    total++;
  });
  var time = new Date() - d;
  console.log('hits: ' + hits + '/' + total );
  console.log('time: ' + time );
  return {
    hits: hits,
    total: total,
    time: time
  }
}




function sentim1 ( text ) {
  return ml.classify(text);
}

function sentim2 ( text ) {
  return sentiment(text).score;
}

function sentim3 ( text ) {
  return analyze(text).score;
}




var xmlP = fs.readFileSync('data/sorted_data_acl/dvd/positive.review', 'utf8');
var inspect = require('util').inspect;

function extractReviews(topic, sentiment) {

  var xml = fs.readFileSync('data/sorted_data_acl/' + topic + '/' + sentiment+ '.review', 'utf8');
  var obj = parse(xml);
  var arr = obj.root.children;
  var reviews = [];
  _.each(_.map(arr, 'children'), function(val){
    var d = _(val).filter({ name: 'review_text'}).map('content').value();
    reviews.push(d);
  });
  return _.flatten(reviews);
}

// var reviews = extractReviews(xmlP);
//
// _.each({
//   "syzer/sentiment-analyser": sentim1,
//   "winster/sentiment": sentim2,
//   "thinkroth/Sentimental": sentim3
// }, function(f, key) {
//   console.log(key);
//   bench(f, reviews);
//
// });


var hits = 0, total = 0, i = 0;
function japerk ( i ) {

  var options = {
    url: 'https://japerk-text-processing.p.mashape.com/sentiment/',
    method: "POST",
    headers: {
      'Content-type': 'x-www-form-urlencoded',
      'X-Mashape-Key': process.env.MASHAPE_KEY,
      'Accept': 'application/json'
    },
    form: {language:'english', text: reviews[i]}
  };

  function callback(error, response, body) {
    // console.log("callback function");
    if (!error) {
      var info = (JSON.parse(body));
      console.log(i);
      console.log(inspect(info , { colors: true, depth: Infinity }));
      // console.log("status 200");
      if(info.label === "pos"){
        hits++;
      }
      total++;
      if(i<100) {
        japerk(++i);
      } else {
        console.log('hits: ' + hits + '/' + total );
      }
    }
    else {
      console.log(JSON.parse(body));
    }
  }

  request.post(options, callback);

}




// var res = japerk(0);

// var sent = "It's fucking cunt cunt cunt cunt";
// console.log(sentim1(sent));
// console.log(sentim2(sent));
// console.log(sentim3(sent));

module.exports = {
  nodeAnalyzers:  function() {
    return [sentim1, sentim2, sentim3];
  },
  bench: bench,
  extractReviews: extractReviews
};

