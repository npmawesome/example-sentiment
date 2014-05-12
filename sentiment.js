var
  request = require('request'),
  cheerio = require('cheerio'),
  sentiment = require('sentiment')
  ;

function sentimentToSmiley(sentiment) {
  var score = sentiment.score;

  if(score === 0) { return ':-|' }
  if(score < 0) {
    if(score > -2) { return ':-(' }
    return ':`('
  }

  if(score < 2) { return ':-)' }
  return ':-D'
}

request('https://www.twitter.com/dhh', function(err, response) {
  var $ = cheerio.load(response.body);

  $('.ProfileTweet-text').toArray().forEach(function(item) {
    var text = $(item).text();
    var results = sentiment(text);
    console.log(sentimentToSmiley(results), '-', text.replace(/\n/g, ' '));
  });
});