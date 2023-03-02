/*
    1. 在TERMINAL里输入npm init来创建.json文件
*/

var http = require("http");
var path = require("path");
var fs = require("fs"); //加载文件系统file system模块

var hostname = "localhost";
var port = 5000;

var server = http.createServer((req, res) => {
  console.log(`Request for ${req.url} by method ${req.method}`);

  if (req.method === "GET") {
    var fileUrl = req.url;
    if (fileUrl === "/") {     //http://http://localhost:5000/
      fileUrl = "/index.html"; //http://http://localhost:5000/index.html
    } else if (fileUrl === "/about") {
      fileUrl = "/about.html"; //http://http://localhost:5000/about.html
    } else if (fileUrl === "/contact") {
      fileUrl = "/contact.html"; //http://http://localhost:5000/contact.html
    }

    //define the path to the public folder
    var filePath = path.resolve("./public" + fileUrl);
    var fileExt = path.extname(filePath);

    if (fileExt === ".html") {
      fs.access(filePath, function (err) {
        if (err) {
          res.statusCode = 404;
          res.setHeader("Content-Type", "text/html");
          res.end(
            `<html><body><h1>Error 404: ${fileUrl} not found</h1></body></html>`
          );
          return;
        }
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        fs.createReadStream(filePath).pipe(res); //创建可读流式文件
        //fs.createWriteStream(filePath).write("l;sdjfadskjlf;j"); 创建可写入流式文件
      });
    } else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/html");
      res.end(
        `<html><body><h1>Error 404: ${fileUrl} is not an HTML file</h1></body></html>`
      );
    }
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.end(
      `<html><body><h1>Error 404: ${req.method} not supported</h1></body></html>`
    );
  }
});

/* 
    以下为成功运行后显示的output message
*/
server.listen(port, hostname, () => {
  console.log(`The NodeJS server on port ${port} is now running...`); //不是''  是``
});