
var http = require('http');
var fs = require('fs');

var port = process.env.port || 8080;

http.createServer(async function(req, res) {
    fs.readFile("index.html", function(err, txt) { res.write(txt); res.end(); });
    //var txt = await fs.readFile("index.html"); res.write(txt); res.end();
    //res.write(`<script>window.location.assign("index.html")</script>`); res.end();
}).listen(port);
