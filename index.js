import express from "express";
import mongoose from "mongoose";
import actions from './controllers/actions.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
//קידוד URL
app.use(express.urlencoded({extended:false}));
app.use(express.json());

const mongo_url=process.env.Mongo_URL;
const port=process.env.Port;

app.use('/api',actions);
mongoose.set({'strictQuery':false});
mongoose.connect(mongo_url)
.then(results =>{
console.log(results);
app.listen(port,function(){
        console.log(`Server is Running via Port ${port}`);
    })
})
.catch(error =>{
    console.error(error);
})

