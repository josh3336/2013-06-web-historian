exports.datadir = __dirname + "data/sites.txt"; // tests will need to override this.
exports.josh="josh";
exports.sum=function(numa,numb){
  return numa+numb;
};

exports.handleRequest = function (req, res) {
  var body='';
  console.log(exports.datadir);

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