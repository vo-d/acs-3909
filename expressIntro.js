const express = require("express");
const serveIndex = require("serve-index");

const app = express();
const port = 5000;

//add middleware
app.use("/text", serveIndex(__dirname + "/text", {icon: true}));
//middleware to serve static file such as image, text, ...
app.use("/text", express.static("./text"));
//this middleware take the data out of the body and fill into the property of the request
app.use(express.urlencoded({extended:true}))

//get request of "/" and repond "hello I am express!" when status code is 200 (no error and finished loading)
app.get("/", (req, res) =>{
    // queryString parameters method
    // req.query.user get the user input on url and put into content
    // http://localhost:5000/?user=dai%20vo&page=12300
    res.status(200).send("hello I am express!" + req.query.user + " " + req.query.page)
})
app.post("/formsubmission",)
app.listen(port, () =>{
    console.log(`app listening on port ${port}`);
})