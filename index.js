const express = require('express');
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require('cors');



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kosfb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

console.log(uri);

async function run () {
    try{
        await client.connect();
        const database = client.db('travel_Site');
        const servicesCollection = database.collection('services');


        // GET Services Api
        app.get('/services', async (req, res) =>{
            const cursor = servicesCollection.find({});
            const services = await cursor.toArray();
            res.send(services);
        })
    }
    finally{
        // await client.close();
    }
}

run().catch(console.dir)

const app = express ();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) =>{
    res.send('green island server is running')
});

app.listen(port, () =>{
    console.log('Server running in port', port);
})