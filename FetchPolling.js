const express = require("express");
const serveIndex = require("serve-index")

const app = express();
const port = 3000;

app.use("/public", serveIndex(__dirname + "/public", {icon:true}));
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res)=>{
    res.status(200).send("Hello I am Express");
})
app.get("/random_number", (req, res)=>{
    let random_number = Math.random();
    res.send(random_number);
})

app.listen(port,()=>{
    console.log("app listening on port 3000")
})