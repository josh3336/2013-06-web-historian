var fs = require('fs');
var http = require('http-get');
exports.readUrls = function(filePath, cb){
  console.log('trying to read',filePath);

  fs.readFile(filePath, 'utf8', function(err, data){
    if (err) throw err;
    var urlarray = data.split('\n');
    cb(urlarray);
  });

};

exports.downloadUrls = function(urls){
  for(var i=0;i<urls.length;i++){
    var options = {url: urls[i]};
    http.get(options, '/path/to/foo.pdf', function (error, result) {
      if (error) {
        console.error(error);
      } else {
        console.log('File downloaded at: ' + result.file);
      }
    });
  }
};