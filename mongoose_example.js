const mongodb = require('mongodb');
const mongoose = require("mongoose");
const uri = 'mongodb+srv://teacher:acs-3909@cluster0.pinke9y.mongodb.net/express?retryWrites=true&w=majority';
const client = new mongodb.MongoClient(uri);
mongoose.connect(uri)

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: true,
    },
    grade: {
        type: String,
        required: true,
        enum: ["A+", "A", "B+", "..."]
    },
    credits: {
        type: Number,
        min: 0,
        max: 3
    }
});
const studentSchema = new mongoose.Schema({
    familyName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true,
        enum: ["ACS", "PHYS", "MATH"]
    },
    year: {
        type: Number,
        required: true,
        min: 1800,
        max: 3000
    },
    gpa: {
        type: mongoose.Decimal128,
        min: 0.0,
        max: 5.0
    },
    courses: [courseSchema],

},     {
    // method for returning attribute of one item in collection
    methods: {
        getRecords() {
            return `This student has a gpa of ${this.gpa}`
        }
    }, 
    statics:{
        listDepartmentStudent(department, minGPA){
            return this.find({department: department, gpa: {$gt: minGPA}})
        }
    }
    
});

const Student = mongoose.model("student", studentSchema);

async function insert() {
    await mongoose.connect(uri).catch(console.log);
    const newStudent = new Student({
        familyName: "Another",
        firstName: "Bob",
        department: "ACS",
        year: 2011,
        gpa: 4.1,
        courses: [
            {
                courseName: "Adv. Int. Programming",
                grade: "A",
                credits: 3
            },
        ]
    });
    return result = await newStudent.save()
}

// another way to create method instead of doing it in option in schema
studentSchema.methods.fullName = function(){
    return this.firstName + " " + this.familyName
};

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
// setTimeout(() => {console.log("Done")}, 10000);
