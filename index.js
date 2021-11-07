const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectID;
const phonesSchema = require('./DB/db.schemas')
const bodyParser = require('body-parser')

require("dotenv").config()
const PORT = process.env.PORT;


app.use(bodyParser.urlencoded({extended:true}));
const phone = mongoose.model("phone", phonesSchema);

//-------Route functions-------//
const getNewPhone = (req,res) => {
    if(req.url !== ('/phones/new')){
        throw err
        res.send(err)
    }else{
        const {name, model} = req.body;
        phone.create({name, model}, (err,doc) =>{
            if(err) console.log(err);
            res.send(doc)
        });

    }
}

const printPhones = (req,res) => {
    if(req.url !== ('/phones')) {
        throw err
        res.send("Error")
    }else{
        const dbName = 'newphones';
        async function main() {
            const client = new MongoClient("mongodb://localhost:27017/newphones");
            await client.connect();
            const db = client.db(dbName);
            const collection = db.collection('phones');
            const findResult = await collection.find({}).toArray();
            res.send(findResult)
        }
        main()
    }
}

const phoneDelete = (req,res) =>{
    if(req.url.match('/phones/id:')){
        let idFromUrl = req.url.replace('/phones/id:', '');
        console.log(idFromUrl);
        const dbName = 'newphones';
        async function main() {
            const client = new MongoClient("mongodb://localhost:27017/newphones");
            await client.connect();
            const db = client.db(dbName);
            const collection = db.collection('phones');
            const findResult = await collection.deleteOne({"_id" :ObjectId(`${idFromUrl}`)});
            res.send(findResult);
        }
        main();
    }else{
        throw err
        res.send("Error")
    }

}

const phoneUpdate = (req,res) => {
    if(req.url.match('/phones/id:')){
        let idFromUrl = req.url.replace('/phones/id:', '');
        console.log(idFromUrl);
        const dbName = 'newphones';
        async function main() {
            const client = new MongoClient("mongodb://localhost:27017/newphones");
            await client.connect();
            const db = client.db(dbName);
            const collection = db.collection('phones');
            const findResult = await collection.findOneAndUpdate({"_id" :ObjectId(`${idFromUrl}`)}, {$set:{name:`${req.body.name}`,model:`${req.body.model}`}}, {new: true});
            console.log(findResult);
            res.send(findResult);
        }
        main();
    }else{
        throw err
        res.send("Error")
    }

}

//-------Route request methods------//

app.get('/', (req,res) =>{
    res.send(200);
})

app.post('/phones/new', getNewPhone);

app.get('/phones', printPhones);

app.delete(/\/phones\/id:(.*)/, phoneDelete);

app.patch(/\/phones\/id:(.*)/, phoneUpdate);

//-------Server listening method-------//

mongoose.connect("mongodb://localhost:27017/newphones", function (err) {
    if(err)  return console.log(err)
    app.listen(PORT, function(){
        console.log(`Port is ${PORT}`)
    })
});
















