var fs = require('fs');

exports.readUrls = function(filePath, cb){
  console.log('trying to read',filePath);

  fs.readFile(filePath, 'utf8', function(err, data){
    if (err) throw err;

    var urlarray = data.split('\n');
    cb(urlarray);
  });

};

exports.downloadUrls = function(urls){
  // fixme
};