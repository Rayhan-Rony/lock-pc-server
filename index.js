const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())
// lockpc
// qX74ZUQR7c6bRjCu


// ******* dotenv 

// app.get('/', (req, res) => {
//     res.send('Server running')
// })

const uri = "mongodb+srv://lockpc:qX74ZUQR7c6bRjCu@cluster0.t1ebet1.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const servicesCollection = client.db('lockpc').collection('services')
        const reviewsCollection = client.db('lockpc').collection('reviews')

        app.get('/', async (req, res) => {
            const query = {};
            const cursor = servicesCollection.find(query).limit(3);
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
            // console.log(req.params.id)
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
            // console.log(query)
            const cursor = reviewsCollection.find(query)
            const result = await cursor.toArray()
            res.send(result)
        })

        app.delete('/reviews/:id', async (req, res) => {
            const id = req.params.id
            console.log(id)
            const query = { _id: ObjectId(id) }
            const result = await reviewsCollection.deleteOne(query)
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