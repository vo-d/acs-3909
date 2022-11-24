
// Setup Express
const express = require("express");
const cookieParser = require("cookie-parser")

const app = express();
const port = 3000;

//Cookie middleware
app.use(cookieParser("myCookieSecret"))

// Create cookie without middleware 
/* app.get("/", (req, res)=>{
    // set cookies
    res.setHeader("Set-Cookie", ["C1=Hello; Max-Age=5", "C2=World"])
    res.send("cookies set")
}) */

// Create cookie with middleware
app.get("/", (req, res)=>{
    res.cookie("mySignedCookie", "ChocolateChip", {signed: true})
    res.cookie("C1", "Hello")
    res.send("Cookies set")
})

app.get("/displayCookies", (req, res)=>{
    res.send(req.signedCookies)
})

app.get("/deleteCookies", (req, res)=>{
    res.clearCookie("mySignedCookie");
    res.clearCookie("C1");
    res.redirect("/displayCookies");
})

app.listen(port, ()=>{
    console.log(`app listening on port ${port}`)

})