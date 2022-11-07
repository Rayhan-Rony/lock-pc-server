const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())
// lockpc
// qX74ZUQR7c6bRjCu


// ******* dotenv 

app.get('/', (req, res) => {
    res.send('Server running')
})

const uri = "mongodb+srv://lockpc:qX74ZUQR7c6bRjCu@cluster0.t1ebet1.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const servicesCollection = client.db('lockpc').collection('services')

        app.get('/services', async (req, res) => {
            const query = {};
            const cursor = servicesCollection.find(query);
            const services = await cursor.toArray()
            res.send(services)
        })
    }
    finally {

    }
}
run().catch(err => console.error(err))

app.listen(port, () => {
    console.log("its ok")
})