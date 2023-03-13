import Jwt  from "jsonwebtoken";
import asyncHendler from 'express-async-handler';
import account from "../models/account.js";

const protect=asyncHendler(async(request,response,next)=>{
let token;
if(request.headers.authorization && request.headers.authorization.startsWith('Bearer')){
    try{
        token=request.headers.authorization.split(' ')[1];
        const decoded= Jwt.verify(token,process.env.JWT_KEY);
        // console.log(`Decoded: ${decoded}`);
        request.user=await account.findById(decoded.dataToToken._id);
        next();
    }
    catch(error){
        return response.status(401).json({message:error.message})
    }
    }else{
        return response.status(401).json({
            message:'Forbidden'
        })
    }
})
export default protect;