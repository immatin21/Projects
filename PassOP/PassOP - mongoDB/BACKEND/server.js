const bodyParser = require('body-parser');
const express = require('express')
require('dotenv').config()
const { MongoClient } = require('mongodb');
const cors = require('cors')

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'PassOP';
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(cors())

client.connect();
console.log('Connected successfully to server');

// Get All Passwords
app.get('/', async(req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('Passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})
 
// Save Passwords
app.post('/', async(req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('Passwords');
    const findResult = await collection.insertOne(password);
    res.send({success : true})
})

// Delete Passwords
app.delete('/', async(req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('Passwords');
    const findResult = await collection.deleteOne(password);
    res.send({success : true , findResult})
})


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
