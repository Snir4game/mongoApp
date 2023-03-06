import mongoose from "mongoose";
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    _id:mongoose.Schema.Types.ObjectId,
    firstName:String,
    lastName:String,
    email:String,
    password:String,
    avatar:{type:String,default:'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o='},
    createAt:{ type:Date,default:Date.now},
})

export default mongoose.model('Account', accountSchema);