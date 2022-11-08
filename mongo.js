const express = require('express')
const nunjucks = require('nunjucks')
const mongodb = require('mongodb')
const app = express()

const uri = "mongodb+srv://vo-d3129620:09022002@cluster0.ksuggsl.mongodb.net/?retryWrites=true&w=majority"


// we need a client that connect to the db server using connection uri
const client = new mongodb.MongoClient(uri)

// we create an async funtion which we want to run before the server really start
// we do it like this because we dont want our server to do anything if it's not connect to db  
async function connectMongoDB(){

    // connect to the server
    await client.connect();
    // .collection: if there is no collection, it will create a new collection. So becareful
    const mycol = await client.db("sample_guides").collection("planets")

    // find the first encouter in the database with the given key and value
    const somePlanet = await mycol.findOne({name: "Earth"})

    /* 
    // if it's find(), not findOne(), it will return the cursor of the result
    // limit(2) will limit the result to 2 result
    // skip(2) will skip the first 2 result
    // sort will sort the data return by a stated key in the data. 1 is ascending, -1 is descending

    const cursor = await mycol.find({}).sort({orderFromSun: 1}).limit(2).skip(2) 
    */

    /*
     // if there is nothing in find, it will return the whole database because the cursor is pointing to the whole db

     await cursor.forEach(doc =>{
        console.log(doc.name)
    }) */

    // project() will limit the data return for cursor to stated key-value pair.
    // 0 mean dont show that key-value pair, 1 mean show that key-value pair
    const cursor = await mycol.find({}).sort({orderFromSun: 1}).project({_id:0, name: 1, orderFromSun: 1})
    

    // convert db to array. Beware if the data is too big, you may get error.
    //const arrayOfDocs = await cursor.toArray(); 

     
     // Event API paradigm
    cursor.stream().on("data", (data) =>{
        console.log(data)
    })

    return "Querried"
}

async function testInserts(){
    await client.connect();
    const mycol = await client.db("express").collection("instruments")
    const myDoc = {
        name: "Trumpet",
        material: "Brass"
    }
    const queryDoc = {
        name: "Trumpet"
    }
    const queryDoc2 = {
        instrumentName : "Guitar"
    }
    const updateDoc2 = {
        // set will change the value of the key to the new value
        $set: {
            hands: 4
        },
        // rename will change the name of the key
        $rename: {
            name: "instrumentName"
        },
    }
    const replacementDoc = {
        name: "Guitar", 
        hands: 2
    }
    /* 
    // insertOne() insert one data into the collection without checking for existence

    return await mycol.insertOne(myDoc) 
    */

    /* 
    // the better way is to use upsert instead of insert
    // the first field is to find data with given key-value, $set will change the value with given key
    // if data is not found, then create data with that name, and with the set key-value
    
    const result = await mycol.findOneAndUpdate(
        {name: "Trumpet"}, {$set: {hands: 2}}, {upsert:true}
    )
    */

    /* 
    // deleteMany() delete all encouter with the given key-value

    return await mycol.deleteMany(queryDoc) 
    */

    
    /* // updateMany will update all data with given key-value pair, with the value that we want to update

    return await mycol.updateMany(queryDoc2, updateDoc2)  */
   

    // replaceOne will replace data with given key-value pair, with the value that we want to replace

    return await mycol.replaceOne(queryDoc2, replacementDoc)
}
// run the server then log to console
/* connectMongoDB().then(data => console.log(data[0])) */
testInserts().then(data => console.log(data))

nunjucks.configure("views", {
    autoescape:true,
    express:app,
    noCache:true
})
app.use(express.urlencoded({extended:true}))

app.listen(5000)