const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config()

// middleWare 
app.use(cors())
app.use(express.json())

// Mongobd Info 
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.t1ebet1.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const servicesCollection = client.db('lockpc').collection('services')
        const reviewsCollection = client.db('lockpc').collection('reviews')


        // api 

        app.get('/', async (req, res) => {
            const query = {};
            const cursor = servicesCollection.find(query).sort({ datefield: -1 }).limit(3);
            const services = await cursor.toArray()
            res.send(services)
        })

        app.get('/services', async (req, res) => {
            const query = {};
            const cursor = servicesCollection.find(query);
            const services = await cursor.toArray()
            res.send(services)
        })
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const service = await servicesCollection.findOne(query)
            res.send(service)

        })
        app.post('/reviews', async (req, res) => {
            const review = req.body;
            const result = await reviewsCollection.insertOne(review)
            res.send(result)
        })
        app.get('/reviews', async (req, res) => {
            let query = {};
            if (req.query.email) {
                query = {
                    email: req.query.email
                }
            }

            const cursor = reviewsCollection.find(query)
            const myreviews = await cursor.toArray()
            res.send(myreviews)
        })
        app.get('/reviews/:id', async (req, res) => {
            const id = req.params.id
            const query = { service_id: parseInt(id) }
            const cursor = reviewsCollection.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })

        app.delete('/reviews/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await reviewsCollection.deleteOne(query)
            res.send(result)
        })
        app.patch('/reviews/:id', async (req, res) => {
            const id = req.params.id;
            const message = req.body.message;
            const query = { _id: ObjectId(id) }
            const updatedMessage = {
                $set: {
                    message: message
                }
            }
            const result = await reviewsCollection.updateOne(query, updatedMessage)
            res.send(result)
        })
        app.post('/services', async (req, res) => {
            const service = req.body
            const result = await servicesCollection.insertOne(service)
            res.send(result)
        })


    }
    finally {

    }
}
run().catch(err => console.error(err))

app.listen(port, () => {
    console.log("its ok")
})