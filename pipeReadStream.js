let http = require("http")
let fs = require("fs");
let path = require("path");

let hostname = "127.0.0.1";
let port = 3000;


const mimeTable = {
    "jpeg": "image/jpeg",
    "html": "text/html",
    ".js": "text/javascript"
};

let server = http.createServer((req, res)=>{
    if(!fs.existsSync("./text" + req.url)){
        res.writeHead(404);
        res.end("file not found");
    }

    res.writeHead(200, {'contentType': mimeTable})
    console.log(req.method);
    console.log(req.url);
    let contentType = mimeTable[path.extname(req.url)]
    res.writeHead(200, {"Content-Type": "image/jpg"});
    let readableStream = fs.createReadStream("./text/sample.jpg");
    
    // send the response to website and close the res
    readableStream.pipe(res);

});

server.listen(port, hostname, () =>{
    console.log("server is ready")
})