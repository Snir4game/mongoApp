import express from "express";
import mongoose from "mongoose";
import actions from './controllers/actions.js';

const app = express();
//קידוד URL
app.use(express.urlencoded({extended:false}));
app.use(express.json());

const mongo_url = "mongodb+srv://Snir4game:Asd123asd@cluster0.fc05gdm.mongodb.net/?retryWrites=true&w=majority";

const port=3001;

app.use('/api',actions);

mongoose.connect(mongo_url)
.then(results =>{
console.log(results);
})
.catch(error =>{
    console.error(error);
})

app.listen(port,function(){
    console.log(`Server is Running via Port ${port}`);
})