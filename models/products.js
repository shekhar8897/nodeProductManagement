require('dotenv').config();
const mongoose=require("mongoose");
const SchemaTypes=mongoose.Schema.Types;
const UserAccounts=require("./userAccount");
require("mongoose-long")(mongoose)

const products=mongoose.Schema(
    {
        userId: { 
            type: SchemaTypes.ObjectId,
            ref: UserAccounts.model("userAccounts"),
            immutable:true,
        },
        productsName:{
            type:String,
            required:true,
            trim:true
        },
        productPrice:{
            type:String,
            required:true,
            trim:true
        },
        productVendor:{
            type:String,
            required:true,
            trim:true
        },
        productQuantity:{
            type:Number,
            required:true,
            trim:true
        },
        productWarranty:{
            type:Number,
            required:true,
            trim:true
        }
    },
    {
        timestamps:true
    }
)
products.methods.toJSON=function(){
    try {
        const product=this;
        const productObject=product.toObject()
        return productObject;
    } catch (error) {
        return error;
    }
}

module.exports=mongoose.model('products',products);