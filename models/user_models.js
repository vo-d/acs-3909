const mongoose = require("mongoose")
const hash = require("pbkdf2-password")();
// const hash = require("bcrypt");

const userSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    hash:{
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    }
}, {
    statics: {
        authenticate(username, pw, callback){
            this.findOne({user:username}, (err, doc)=> {
                if (doc){
                    console.log("Found entry")
                    console.log("Salt: ", doc.salt);
                    hash({password: pw, salt: doc.salt}, function(err, pass, salt, hash){
                        if (err) return err;
                        if(hash === doc.hash){
                            return callback(username);
                        } 
                        else{
                            console.log("wrong password");
                            return callback(null)
                        }
                    })

                }
                else{
                    console.log("no user found")
                    return callback(null)
                }
            })
        }
    }
}
);

const User = mongoose.model("user", userSchema);

async function seedUser(uri) {

    const newUser = new User({
        user: "Admin",
        hash: "",
        salt: ""
    });

    hash({password: "SuperSecret"}, (err, pass, salt, hashed)=>{
        if (err) throw err;
        newUser.hash = hashed;
        newUser.salt = salt;
    })

    await mongoose.connect(uri).catch(console.log);
    await mongoose.connection.db.dropCollection("users")
    console.log("collection dropped")

    return result = await newUser.save()
    console.log("collection seeded")

}

module.exports ={
    User: User,
    seedUser: seedUser
}