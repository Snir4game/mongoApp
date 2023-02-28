import express from "express";
const Router = express.Router();
import mongoose from "mongoose";

import Category from "../models/category.js";

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

export default Router;