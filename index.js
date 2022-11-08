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
            console.log(req.params.id)
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const service = await servicesCollection.findOne(query)
            res.send(service)
            // const service = await cursor.toArray()
        })


    }
    finally {

    }
}
run().catch(err => console.error(err))

app.listen(port, () => {
    console.log("its ok")
})