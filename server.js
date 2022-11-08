const express = require('express');
const nunjucks = require("nunjucks");
const mongodb = require('mongodb');
const expressWs = require('express-ws');
const path = require("path")

const app = express();
const wsInstance = expressWs(app);
const port = 5000;

nunjucks.configure("views", {
    express:app,
    noCache: true
})

const uri = "mongodb+srv://vo-d3129620:09022002@cluster0.ksuggsl.mongodb.net/?retryWrites=true&w=majority";
const client = new mongodb.MongoClient(uri);

async function watchDB(){
    await client.connect();
    const col = await client.db("express").collection("reactiveVars");
    return col.watch({fullDocument: "updateLookup"})
}
app.ws("/vars", async(ws, req)=>{
    console.log("Web Socket opened")
    await client.connect();
    const col = client.db("express").collection("reactiveVars");

    //Handle variable update from client
    ws.on("message", (msg)=>{
        console.log("Received from browser: " + msg);
        
        let updateData = {
            $set: JSON.parse(msg)
        }
        col.findOneAndUpdate({"varName": JSON.parse(msg).varName}, updateData, {upsert:true})
        console.log("updated MongoDB")
    })
    const aWss = wsInstance.getWss("/vars");
    // Relay updates from DB
    watchDB().then(stream=>{
        stream.on("change", changeEvent =>{
            console.log("MongoDB has changed: ", changeEvent);
            aWss.clients.forEach((client)=>{
                let data = {
                    "varName": changeEvent.fullDocument["varName"],
                    "value": changeEvent.fullDocument["value"]
                };
                client.send(JSON.stringify(data))
            })
        })
    })
})

//HTTP
app.get("/", async(req,res)=>{
    await client.connect();
    const col = client.db("express").collection("reactiveVars");
    let cursor = col.find({});
    const allVariables = await cursor.toArray();
    res.render(path.resolve(__dirname + "/views/reactivity.njk"), {reactiveVariables: allVariables})
})
app.listen(port); 