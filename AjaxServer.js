const express = require('express');
const serveIndex = require("serve-index");

const app = express();
const port = 3000;

app.use("/public", serveIndex(__dirname+"/public", {icon:true}));
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res)=>{
    res.status(200).send("Hello I am express");
});

app.post("/formHandler", (req, res)=>{
    console.log(req.body)
    req.body.message = "Data received!";
    res.status(200).send(req.body)
})

app.listen(port,()=>{
    console.log(`App listening on port ${port}`)
})