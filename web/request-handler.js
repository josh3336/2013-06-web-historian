exports.datadir = __dirname + "data/sites.txt"; // tests will need to override this.
exports.josh="josh";
var path = require('path');
var url = require('url');
var filePath;
var file;


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
    req.on('data',function(chunk){
      body+=chunk;
    });
    req.on('end',function(chunk){
      body=JSON.parse(body);
      writetoFile('/Users/hackreactor/code/josh3336/2013-06-web-historian/data/sites.txt', body.address+"\r\n");
      console.log('end of request, the body is',body);
    });

  }
  else if (req.method === 'GET') {
    if(req.url === '/' || req.url === '/index'){ 
      filePath = path.join(__dirname, "public/index.html");
      file=fs.readFileSync(filePath);
      console.log('need to serve index');
      res.writeHead(200,{'Content-Type':'text/plain'});
      res.end(file);
    }
    else if(urlsplit[urlsplit.length-1]!=='/index'){ 
      console.log('need to serve not index');
      filePath = path.join('/Users/hackreactor/code/josh3336/2013-06-web-historian/data/sites', urlsplit[urlsplit.length-1]);
      file=fs.readFileSync(filePath);
      res.writeHead(200,{'Content-Type':'text/plain'});
      res.end(file);
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
  fs.appendFile(location, content, function(err) {
      if(err) {
          console.log('err');
      } else {
          console.log("The file was saved!");
      }
  }); 
};


parseurl =function parseUrl( url ) {
    var a = document.createElement('a');
    a.href = url;
    return a;
}
