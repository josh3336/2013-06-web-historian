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
   http.get('http://www.google.com', function (error, result) {
    if (error) {
      console.error(error);
    } else {
      console.log('File downloaded at: ' + result.file);
    }
  });
};