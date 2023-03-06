import express from "express";
const Router = express.Router();
import mongoose from "mongoose";
import account from "../models/account.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Category from "../models/category.js";

Router.get('/getCategories',async(request,response) => {
    //OP 1
    //find all
    const categories = await Category.find();
    //find all by condicion
    // const categories=await Category.find({isPublished:true});
    //find one by id 
    // const categories=await Category.findById('6405a3b3fb3573302e069da5');
    //find one by condicion
    // const categories=await Category.findOne({isPublished:true});
        return response.status(200).json({
        categories:categories
    })
})


Router.post('/CreateNewCategory',async(request,response) =>{
    //Create objectID
    const id = mongoose.Types.ObjectId();
    //Get data from Postman
    const categoryName = request.body.categoryName;
    //Create new doc in Category collection
    const _category = new Category({
        _id:id,
        categoryName:categoryName
    })
    _category.save()
    .then(results => {
        return response.status(200).json({
            results:results
        })
    })
    .catch(error =>{
        console.log(error.message);
    })
})

//auth Functions

//Register
Router.post('/register',async(request,response)=>{
    //get account info from body
    const {firstName,lastName,email,password}=request.body;
    //check if user (email)exist
    const isAccountExist= await account.findOne({email:email});
    if(isAccountExist)
    {
        return response.status(200).json({
            message:'Account Exist'
        });
    }


    //password crypt
const hash_password =await bcryptjs.hash(password,10);
    //create user in db
    const id = mongoose.Types.ObjectId();
    const _account=new account({
        _id:id,
        firstName:firstName,
        lastName:lastName,
        email:email,
        password:hash_password,
    })
    _account.save()
    .then(results => {
        return response.status(200).json({
            results:results
        })
    })
    .catch(error =>{
        console.log(error.message);
    })
})
//login
Router.post('/login',async(request,response)=>{
    //get account info form client
    const {email,password}=request.body;
    //check if user exist by email
    account.findOne({email:email})
    .then(async account => { 
        if(!account)
        {
            return response.status(200).json({
                message:'Account not Exist'
            });
        }
   
        //compare password

        const isMatch=await bcryptjs.compare(password,account.password);
        if(!isMatch){

                return response.status(200).json({
                    message:'Password not Match'
                });
        }
        //Generate jwt token
        const dataToToken={
            _id:account._id,
            name:account.firstName+" "+account.lastName,
            email:account.email,
            avatar: account.avatar
        }
        const token = await jwt.sign({dataToToken},process.env.JWT_KEY, {expiresIn:'30d'});
        //response
        return response.status(200).json({
            message:account,
            token:token
        });
    })
    .catch(error =>{
        return response.status(500).json({
            message:error.message
        })
    })




})





export default Router;