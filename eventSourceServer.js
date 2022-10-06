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
let counter = 0;
app.get("/ticktok", (req, res)=>{
    res.set({
        "Connection": "keep-alive",
        "Content-Type": "text/event-stream"
    })
    let interval = setInterval(()=>{
        counter +=1 ;
        if(counter % 10 ===0) res.write("event: gong\n data: gong\n\n");
        if(counter % 2 ===1) res.write("data: tick\n\n");
        else res.write("data:tok\n\n");
    }, 1000)

    res.on("close", ()=>{
        clearInterval(interval)
        counter = 0;
        res.end();
        
    })
})

app.listen(port,()=>{
    console.log("app listening on port 3000")
})