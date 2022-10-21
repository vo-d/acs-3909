const express = require('express')
const nunjucks = require('nunjucks')
const mongodb = require('mongodb')
const app = express()

const url = "mongodb+srv://teacher:acs-3909@cluster0.pinke9y.mongodb"

async function connectMongoDB(){
    const client = new mongodb.MongoClient(uri)
    await client.connect();
    // .collection: if there is no collection, it will create a new collection. So becareful
    const mycol = await client.db("express").collection("colors")
    // find the first one in the database 
    const doc = await mycol.findOne({})
    // find
    const cursor = await mycol.find({})

    const arrayOfDocs = await cursor.toArray();

    cursor.stream().on("data", (data) =>{
        console.log(data)
    })
    return doc
}

connectMongoDB().then(console.log)

app.listen(5000)