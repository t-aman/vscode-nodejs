

/* ---------------------------------------------- 
 * VSCodeデバッグ用 server.js
 * ----------------------------------------------
 **/

var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var server = http.createServer();

// 起動パラメタ取得
for (var i = 0; i < process.argv.length; i++)
    console.log("argv[" + i + "] = " + process.argv[i]);
var root = process.argv[2];
var port = parseInt(process.argv[3]);

// レスポンス
server.on('request', function (req, res) {
    var uri = url.parse(req.url).pathname;
    if (uri === "/") uri = '/index.html';
    var ext = path.extname(uri);
    var ctype = '';
    switch (ext) {
        case ".htm":
        case ".html": ctype = 'text/html'; break;
        case ".js": ctype = 'text/javascript'; break;
        case ".css": ctype = 'text/css'; break;
        case ".json": ctype = 'text/json'; break;
        case ".jpg":
        case ".jpeg": ctype = 'image/jpeg'; break;
        case ".png": ctype = 'image/png'; break;
        case ".gif": ctype = 'image/gif'; break;
        case ".bmp": ctype = 'image/bmp'; break;
        case ".ico": ctype = 'image/x-icon'; break;
        case ".mp3": ctype = 'audio/mpeg'; break;
        case ".mp4": ctype = 'audio/mp4'; break;
        case ".mpeg": ctype = 'video/mpeg'; break;
        default: ctype = 'text/plain';
    };
    console.log('request : ' + uri + ' content-type : ' + ctype);
    if (ctype.indexOf("text") > -1) {
        fs.readFile(root + uri, 'utf-8', function (err, data) {
            res.writeHead(200, { 'content-Type': ctype });
            try {
                res.write(data);
                res.end();
            } catch (err) {
                console.log('error : ' + err.name + ': ' + err.message);
                res.write('error : ' + uri);
                res.end();
            }
        });
    } else {
        fs.readFile(root + uri, function (err, data) {
            try {
                res.writeHead(200, { 'content-Type': ctype });
                res.end(data);
            } catch (err) {
                console.log('error : ' + err.name + ': ' + err.message);
                res.end();
            }
        });
    }
    return;
});

server.listen(port)
console.log('Server running at http://localhost:' + port.toString() + '/');
