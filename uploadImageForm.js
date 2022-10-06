const express = require('express');
const multiparty = require('multiparty')
const fs = require('fs')
const path = require('path')

const app = express();
const port = 3000;

const validFields ={
    myInput: "",
    myDate: "",
    myColor: "#000000"
};

app.use("/", express.static(__dirname + "/public"))

app.route("/formHandler")
    .get((req, res)=>{
        console.log("Form data: ", req.body)
        res.send("Thanks!")
    })
    .post((req, res)=>{
        //method 1: Parse and save everything!
        //This method is not safe because it takes whatever is sent to here and not excluding virus

        /* let form = new multiparty.Form({uploadDir: "./public"})
        form.parse(req, (err, fields, files)=>{
            console.log(fields);
            console.lorg(files);
            res.send("Received.")
        }) */

        //method 2: parse only fields automatically
        // autoFields: true means that it will automatically parsing on the fields, but not doing anything on the files
        let response = "";
        let form = new multiparty.Form({autoFields: true}); 
        //subscribe fields listener ( event emiter )
        form.on("field", (name, value)=>{
            //check if the parsed field matches any of the fields we expect
            Object.keys(validFields).forEach((validFieldName) => {
                if(validFieldName === name){
                    validFields[validFieldName] = value;
                }
            })
        })

        // after checking field name, now check the file 
        form.on("part", (part)=>{
            console.log(part);

            //check the content type
            if (part.headers["content-type"] !== "image/jpeg"){
                res.status(418);
                response = "invalid file type";
                // tells the parser to continue without reading out the file (if event part hold a file)
                part.resume();
                return
            }
            // check the file name
            if(part.name !== "myFile"){
                part.resume();
                return
            }
            // check the file size, if too large, 
            if(part.byteCount > 3000000){
                part.resume();
                response = "File too large"
                return
            }

            // good case, let's save it
            part.pipe(fs.createWriteStream(path.resolve("./public", part.filename)))
            response = `File with name ${part.filename} saved`
        })

        form.on("close", ()=>{
            res.send(response);
        });

        form.parse(req);
    });

app.use((req, res)=>{
    res.status(404).sendFile(__dirname + "/public/404.html")
})

app.use((err, req, res, next)=>{
    console.log(err.stack)
    res.status(404).sendFile(__dirname + "/public/500.html")
})

app.listen(port, ()=>{console.log("Running")})