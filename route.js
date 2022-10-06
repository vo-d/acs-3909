const express = require('express');

const app = express();
const port = 3000;

app.use("/", express.urlencoded({extended:true}));
app.use(express.json());

app.route("/formHandler")
    .get((req, res)=>{
        console.log("Form data: ", req.body)
        res.send("Thanks!")
    })
    .post((req, res)=>{
        console.log("Form data: ", req.body);
        res.send(`received POST request: ${JSON.stringify(req.body)}`)
    });
s.static(__dirname + "/public"));


app.listen(port)