exports.datadir = __dirname + "data/sites.txt"; // tests will need to override this.
exports.josh="josh";
var path = require('path');
var url = require('url');
var filePath;
var file;
var fs = require('fs');


exports.sum=function(numa,numb){
  return numa+numb;
};

exports.handleRequest = function (req, res) {
  var fs = require('fs');
  var body='';
  console.log(exports.datadir);
  console.log("request method",req.method);
  var urlsplit = url.parse(req.url).pathname.split("/");
  console.log('url split',urlsplit);

  if ( req.method==='POST' ){
    console.log('handling POST');
    req.on('data',function(chunk){
      body+=chunk;
    });
    req.on('end',function(chunk){
      console.log('body',typeof(body));
      body=body.split('=');
      writetoFile('/Users/hackreactor/code/josh3336/2013-06-web-historian/spec/testdata/sites.txt', body[1]+"\n");
      console.log('end of request, the body is',body);
      res.writeHead(302,{'Content-Type':'text/html'});
      res.end();
      console.log('ending post');
    });


  }
  else if (req.method === 'GET') {
    if(req.url === '/' || req.url === '/index'){ 
      filePath = path.join(__dirname, "public/index.html");
      file=fs.readFileSync(filePath);
      console.log('need to serve index');
      res.writeHead(200,{'Content-Type':'text/html'});
      res.end(file);
    }

    else if(urlsplit[1]!=='/index'){ 
      console.log('need to serve not index');
      filePath = path.join('/Users/hackreactor/code/josh3336/2013-06-web-historian/data/sites', urlsplit[urlsplit.length-1]);
      if(fs.existsSync(filePath)){
        file=fs.readFileSync(filePath);
        res.writeHead(200,{'Content-Type':'text/plain'});
        res.end(file);
      }
      else{
        console.log('not serving');
        res.writeHead(404,{'Content-Type':'text/html'});
        res.end();
      }
    }

    // For requests for / or index.html
    // Serve up your index.html file
    // Read in your index.html
    // Set the right Content-Type header
    // Send the contents of index.html

    // For requests for /sites/*
    // Serve up the file that was archived!
    // Sorta do the same thing as you did for index.html, but instead for the archived version of the site
  }
};


writetoFile= function(location,content){
  var fs = require('fs');
  console.log(location,content);
  fs.appendFileSync(location, content);
};


parseurl =function parseUrl( url ) {
    var a = document.createElement('a');
    a.href = url;
    return a;
}
