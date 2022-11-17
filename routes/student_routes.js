const express = require("express");
const router = express.Router();
const {Student} = require('../models/student_models')

// Middleware specific to this router
router.use((req, res, next)=>{
    req.dataCollection = Student;
    next();
})

// Attach routes relative to mounting point of this router
router.get("/", async(req, res)=>{
    let students = await req.dataCollection.find({})
    console.log("Retrieved list of students...")
    res.render("students.njk", {students: students})
})

router.route("/edit/:id")
    .get(async (req, res)=>{
        let student = await req.dataCollection.findOne({_id: req.params.id});
        res.render("student_edit.njk", {student: student})
    })
    .post(async(req, res)=>{
        const student = await req.dataCollection.findOne({_id: req.params.id})
        
        // Update student
        for (const [key, value] of Object.entries(req.body)) {
            student[key] = value
        }
        student.save()
        console.log("Student updated")
        res.redirect("..")
    })

// more student-related routes
module.exports = router;