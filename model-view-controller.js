const mongodb = require('mongodb');
const mongoose = require("mongoose");
const uri = 'mongodb+srv://vo-d3129620:09022002@cluster0.ksuggsl.mongodb.net/?retryWrites=true&w=majority';
const {Student, seedStudent} = require("./models/student_models")
const client = new mongodb.MongoClient(uri)

// Seed collection. Comment this line to not seed new
seedStudent(uri).then(result =>{});

// Setup Express
const express = require("express");
const nunjucks = require("nunjucks");

const app = express();
const port = 5000;

nunjucks.configure("views", {
    express: app,
    noCache: true
})

// Application level middleware
app.use(express.urlencoded({extended:false}));

// HTTP

const student_routes = require("./routes/student_routes")
app.use("/student", student_routes)



app.listen(port, ()=>{
    console.log(`app listening on port ${port}`)

})


/* 
async function run() {
    await  mongoose.connect(uri).catch(console.log);
    const student = await Student.findOne({familyName: "Another"});

    //call function
    console.log(student.getRecords());
    console.log(student.fullName());

    // call static function (method for the whole schema)
    console.log(await Student.listDepartmentStudent("ACS", 3.0))

    student.department = "ENG";
    await student.validate();
}


run().then(console.log)
    .catch(err => console.dir(err, {depth: null}));
// setTimeout(() => {console.log("Done")}, 10000); */
