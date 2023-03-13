import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema=new Schema({

    id:mongoose.Schema.Types.ObjectId,
    associateAccount:{type:mongoose.Schema.Types.ObjectId, ref:'Account'},
    associateCategory:{type:mongoose.Schema.Types.ObjectId ,ref:'Category'},
    productName: String,
    productPrice: Number,
    productDescripyion:String,
    productStatus:String,
    productImage:String,
    createAt: {type:Date, default:Date.now},
    updateAt: {type:Date, default:Date.now}
})
export default mongoose.model('Product',productSchema);