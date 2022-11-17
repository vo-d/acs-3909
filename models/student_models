const mongoose = require("mongoose")
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

// another way to create method instead of doing it in option in schema
studentSchema.methods.fullName = function(){
    return this.firstName + " " + this.familyName
};

// method to create a collection using the schema mongoose.model(<collection name>, <schema>);
// mongoose will add 's' after collection name
const Student = mongoose.model("student", studentSchema);

async function seedStudent(uri) {
    await mongoose.connect(uri).catch(console.log);
    await mongoose.connection.db.dropCollection("students")
    console.log("collection dropped")

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
    console.log("collection seeded")
    return result = await newStudent.save()
}

module.exports ={
    Student: Student,
    seedStudent: seedStudent
}