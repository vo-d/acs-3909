const express = require('express');
const serveIndex = require("serve-index");
const expressWS  = require("express-ws");

const app = express();
const port = 3000;

const wsInstance = expressWs(app);

app.use("/public", serveIndex(__dirname+"/public", {icon:true}));
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({extended:true}));

app.get("/", (req, res)=>{
    res.status(200).send("Hello I am express");
});

// Websocket
app.ws("/accept-msg", (ws, req)=>{
    console.log("Web Socket opened")

    //create a web socket server
    //this will allow to have more websocket running on a server.
    // the parameter tell each new websocket to connect to the url of the sebsocket server
    const aWss = wsInstance.getWss('/accept-msg');

    // Whenever the message come in
    ws.on("message", (msg)=>{

        //log out message to console
        console.log(msg);

        // log to the console the websocket that has connect to the server
        console.log(aWss.clients)

        // for each websocket that has connected to the server, send msg to them
        aWss.clients.forEach((client) =>{
            client.send(msg)
        })
    })
})

app.listen(port,()=>{
    console.log(`App listening on port ${port}`)
})