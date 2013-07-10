var http = require("http");
var myStuff = require("./request-handler");

var port = 8080;
var ip = "127.0.0.1";
var server = http.createServer(myStuff.handleRequest);
console.log("Listening on http://" + ip + ":" + port);
console.log(myStuff.sum(4,8));
server.listen(port, ip);

