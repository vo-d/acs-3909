const express = require("express");
const nunjucks = require("nunjucks")
const path = require('path')

const app = express();
const port = 5000;



let env = nunjucks.configure("views", {
    autoescape: false,
    express: app,
    noCache: true
})

//Filter
env.addFilter("shout", (str)=>{
    return str.toUpperCase();
})

app.get("/", (req, res)=>{
    res.render("index.njk", {username: "<b>Dai</b>", date: new Date()})
})

app.use(express.urlencoded({extended:true}));
app.use("/public", express.static(__dirname + "/public"));



app.listen(port,()=>{
    console.log("app listening on port 5000")
})