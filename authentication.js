const mongodb = require("mongodb");
const mongoose = require("mongoose");
const {MONGODB, SESSION} = require("./credentials");
const uri =  m 
const {User, seedUser} = require("./models/user_models.js")

// Seed database
seedUser(uri).then(result =>{
    console.log("DB seeded")
});

// Setup Express
const express = require("express");
const session = require("express-session");
const nunjucks = require("nunjucks");


const app = express();
const port = 3000;
nunjucks.configure("views", {
    express: app, 
    noCache: true
})

app.use(session({
    secret: SESSION.secret
}))

//Application level middleware
app.use(express.urlencoded({extended: false}))


const user_routes = require("./routes/user_routes.js");
app.use("/user", user_routes);

app.listen(port, ()=>{
    console.log(`app listening on port ${port}`)

})