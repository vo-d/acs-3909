let http = require("http")

let hostname = "127.0.0.1";
let port = 3000;

let server = http.createServer((req, res)=>{
    console.log(req.url);
    res.write("Hello, from Node!|n" + req.method + req.url);
    res.write(JSON.stringify(req.header));
    res.end();
});

server.listen(port, hostname, () =>{
    console.log("server is ready")
})