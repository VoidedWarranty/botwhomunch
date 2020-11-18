var HTTPS = require('https');
var cool = require('cool-ascii-faces');

var botID = "79e68331dba0dddfb1c4da512f"; //test bot
//var botID = "016ef9300233dded8d0238cec3"; //bot who munch

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^.*mock trial.*$/i,
      complimentRegex = /^munchbot, compliment.*$/i,
      insultRegex = /^munchbot, insult.*$/i,
      magicRegex = /^magic eight bot.*$/i;

  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage();
    this.res.end();
  } 
  else if(request.text && complimentRegex.test(request.text)){
    this.res.writeHead(200);
    postCompliment(request.text.substring(20));
    this.res.end();
  }
  else if(request.text && insultRegex.test(request.text)){
    this.res.writeHead(200);
    postInsult(request.text.substring(16));
    this.res.end();
  }
  else if(request.text && magicRegex.test(request.text)){
    this.res.writeHead(200);
    postMagic(request.text);
    this.res.end();
  }
  else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}


function postMessage() {
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

  setTimeout(console.log('sending ' + botResponse + ' to ' + botID), 50);

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

function postMagic(request) {
  var botResponse, options, body1, body2, botReq1, botReq2;

  botResponse = magicResponse();

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body2 = {
    "bot_id" : botID,
    "text" : ">" + request
  };

  body1 = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq1 = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq1.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq1.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq1.end(JSON.stringify(body1));

  setTimeout(console.log('brief timeout'), 150);

  botReq2 = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq2.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq2.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq2.end(JSON.stringify(body2));
}

function postCompliment(name) {
  var botResponse, options, body, botReq;

  botResponse = getCompliment(name);

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  setTimeout(console.log('sending ' + botResponse + ' to ' + botID), 50);

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

function postInsult(name) {
  var botResponse, options, body, botReq;

  botResponse = getInsult(name);

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  setTimeout(console.log('sending ' + botResponse + ' to ' + botID), 50);

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

function getCompliment(name) {
  var fs = require("fs");
  var text = fs.readFileSync("./compliments.txt").toString('utf-8');
  var compliments = text.split("\n");
  return name + ", " + compliments[Math.floor(Math.random() * (compliments.length - 1))];
}


function getInsult(name) {
  var fs = require("fs");
  var text = fs.readFileSync("./insults.txt").toString('utf-8');
  var insults = text.split("\n");
  return name + ", " + insults[Math.floor(Math.random() * (insults.length - 1))];
}

function magicResponse(){
  var fs = require("fs");
  var text = fs.readFileSync("./magic.txt").toString('utf-8');
  var responses = text.split("\n");
  return responses[Math.floor(Math.random() * (responses.length-1))];
}

exports.respond = respond;
