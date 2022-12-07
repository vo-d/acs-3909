import {MongoClient} from 'mongodb';

// /api/new-meetup
// POST/api/new-meetup

async function handler(req, res){
    // check to ensure that the request to this api is POST request
    if(req.method === 'POST'){
        const data = req.body;

        const client = await MongoClient.connect('mongodb+srv://vo-d3129620:09022002@cluster0.ksuggsl.mongodb.net/?retryWrites=true&w=majority');
       
        const meetupsCollection = client.db('test').collection('meetups')

        const result = await meetupsCollection.insertOne(data);
        console.log(result);

        client.close();

        res.status(201).json({message: "Meetup inserted!"})
    }
}

export default handler;