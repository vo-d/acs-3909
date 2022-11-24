const express = require("express");
const router = express.Router();
const {User} = require('../models/user_models')
const path = require("path")

// Middleware specific to this router
router.use((req, res, next)=>{
    req.dataCollection = User;
    next();
})


// Check authentication
// if req.session.user exist, it means that user is logged in
function restrict(req, res, next){
    if (req.session.user){
        next();
    }
    else{
        req.session.error = "Access denied"
        res.redirect("/user/login")
    }
}

// Log in 
router.get("/login", (req, res)=>{

    res.render("login.njk", {})
})

router.post("/login", (req, res)=>{
    req.dataCollection.authenticate(req.body.user, req.body.password, (username) =>{
        if (username){
            console.log("Authenticated", username);
            req.session.regenerate(() => {
                req.session.user = username;
                // Retrieve info from session storage
                res.redirect("/user/restricted")
            })
        }
        else{
            res.redirect("/user/login")
        }
    })
})

// setup middleware restrict for /restricted so that it check for log in before giving access to restricted content
router.route("/restricted")
    .get(restrict, (req, res)=>{
        res.send("Very secret. User: " + req.session.user)
    })

// Logout
router.get("/logout", (req, res)=>{
    req.session.destroy(()=>{
        res.redirect("./user/login")
    })
})


// export
module.exports = router;