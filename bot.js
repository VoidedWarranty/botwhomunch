var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = "79e68331dba0dddfb1c4da512f"; //test bot
//var botID = "016ef9300233dded8d0238cec3"; //bot who munch

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      FMTRegex = /^.*mock trial.*$/i,
      complimentRegex = /^munchbot, compliment.*$/i;

  if(request.text && FMTRegex.test(request.text)) {
    this.res.writeHead(200);
    postFMT();
    this.res.end();
  } 
  else if(request.text && complimentRegex.test(request.text)){
    this.res.writeHead(200);
    postCompliment(request.text.substring(20);
    this.res.end();
  else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postFMT() {
  var botResponse, options, body, botReq;

  botResponse = "https://imgur.com/a/Xx4g4x6";

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

function postCompliment(complimentee) {
  var botResponse, options, body, botReq;


  botResponse = getRandomCompliment(complimentee);

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}

function getRandomCompliment(complimentee) {
  var fs = require("fs");
  var text = fs.readFileSync("./compliments.txt");
  var compliments = text.split("\n");
  var choice = compliments[Math.floor(Math.random() * (compliments.length-1))];
  var ret = complimentee + ", " + choice;
  return ret;


}


exports.respond = respond;
