const mongodb = require('mongodb');
const uri = 'mongodb+srv://teacher:acs-3909@cluster0.pinke9y.mongodb.net/?retryWrites=true&w=majority';
const client = new mongodb.MongoClient(uri);

async function run() {
    await client.connect();

    const myDB = client.db("express");
    await myDB.createCollection("validated", {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                title: "Student Documents",
                required: ["familyName", "firstName", "department", "year"],
                additionalProperties: false,
                properties: {
                    _id: {},
                    familyName: {
                        bsonType: "string",
                        description: "Family Name"
                    },
                    firstName: {
                        bsonType: "string",
                        description: "All first names, no initials"
                    },
                    department: {
                        enum: ["ACS", "PHYS", "MATH"],
                        description: "Department code"
                    },
                    year: {
                        bsonType: "int",
                        minimum: 1900,
                        maximum: 3000,
                        description: "Enrollment year"
                    },
                    gpa: {
                        bsonType: "double",
                        minimum: 0.0,
                        maximum: 5.0,
                        description: "A non-mandatory field."
                    },
                    courses: {
                        bsonType: "array",
                        uniqueItems: true,
                        items: {
                            bsonType: "object",
                            required: ["courseName", "grade", "credits"],
                            properties: {
                                courseName: {
                                    type: "string"
                                },
                                grade: {
                                    enum: ["A+", "A", "B+", "..."],
                                },
                                credits: {
                                    bsonType: "int",
                                    minimum: 0
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    const myCol = myDB.collection("validated");
    const testStudent = {
        familyName: "No First Name"
    };
    const result = await myCol.insertOne(testStudent);

    return result
}

async function insert() {
    const myDB = client.db("express");
    const myCol = myDB.collection("validated");
    const testStudent = {
        familyName: "Michael",
        firstName: "Beck",
        department: "MATH",
        year: 2008,
        courses: [
            {
                courseName: "Adv. Int. Programming",
                grade: "B+",
                credits: -3
            }
        ]
    };
    return result = await myCol.insertOne(testStudent);

}
insert().then(console.log).catch(err => console.dir(err, {depth: null}));
