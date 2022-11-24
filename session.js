
// Setup Express
const express = require("express");
const session = require("express-session")

const app = express();
const port = 3000;

//Client side session
/* 
const session = require("cookie-session")
app.use(session({
    name: "session",
    keys: ["afssdfasdf", "asfsafasf"]
})) 

// Create client side cookie for session
app.get("/", (req, res)=>{
    req.session.views = (req.session.views || 0) + 1;
    req.session.somethingElse = "Some long string";
    res.send("Loaded " + req.session.views + " times")
})
*/

// The more you add to session, the heavier cookie get. Since cookies can only contain 4KB, session is usually store in server side

// Create server-side session
// if you give cookie or session a secret, it will hash your cookie
app.use(session({
    secret: "palkdjsalkn"
}))

// per page counter using middleware
app.use((req, res, next) =>{
    if(!req.session.views){
        req.session.views ={}
    }
    let pathname = req.url;
    req.session.views[pathname] = (req.session.views[pathname] || 0) + 1;
    console.log(req.session.views);
    next();
})

app.get("/", (req, res)=>{
    res.send("Loaded " + req.session.views["/"] + " times")
})

app.get("/otherSite", (req, res)=>{
    res.send("Loaded " + req.session.views["/otherSite"] + " times")
})

app.listen(port, ()=>{
    console.log(`app listening on port ${port}`)

})