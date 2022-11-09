const mongodb = require('mongodb');
const mongoose = require("mongoose");
const uri = 'mongodb+srv://teacher:acs-3909@cluster0.pinke9y.mongodb.net/express?retryWrites=true&w=majority';
const client = new mongodb.MongoClient(uri);

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

},     {methods: {
    getRecords() {
        return `This student has a gpa of ${this.gpa}`
    }
}});

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

async function run() {
    await  mongoose.connect(uri).catch(console.log);
    const student = await Student.findOne({familyName: "Another"});
    //return student.getRecords(console.log)
    student.department = "ENG";
    await student.validate();
}


run().then(console.log)
    .catch(err => console.dir(err, {depth: null}));
// setTimeout(() => {console.log("Done")}, 10000);
