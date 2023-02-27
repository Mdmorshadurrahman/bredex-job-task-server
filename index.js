const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
//middle wares

app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@musicademy.7cb9w1y.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    try{
        const employeeCollection = client.db('bredexdb').collection('employee');
        

        //GET all the details of employees
        app.get('/employee', async(req,res)=>{
            const query = {};
            const showdetails = await employeeCollection.find(query).toArray();
            res.send(showdetails);
        });
        //POST new person in the employee list
        app.post('/employee', async(req,res) =>{
            const data = req.body;
            const insertEntry = await employeeCollection.insertOne(data);
            res.send(insertEntry);
        });

    }
    finally{

    }
}
run().catch(err => console.error(err));


app.get('/',(req,res) =>{
    res.send('***Bredex Server is running***')
})

app.listen(port, () => {
    console.log(`Bredex server is running on ${port}`);

})