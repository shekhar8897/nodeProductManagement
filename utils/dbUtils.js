require('dotenv').config();
const mongoose=require("mongoose");
const userAccount=require("../models/userAccount");
const product=require("../models/products");


const dbUtils={
    dbInit:function(){
        mongoose.connect(process.env.DB_CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
            }
        );
        const dbConnection=mongoose.connection;
        
        /* ================ Binding connection to event (to get notification of connection )  =================*/
    
        dbConnection.on('error', console.error.bind(console, 'DB STATUS :: ERROR: [ ❌ ]'));
        dbConnection.on('connecting', console.info.bind(console, 'DB STATUS :: CONNECTING............. [ 🏃‍♂️ ]'));
        dbConnection.on('connected', console.info.bind(console, '\t 🏃‍♂️  DB STATUS :: CONNECTED [✔️]'.green));
    },
    findByEmailOrUserName:async function(email,username){
        try {
            let dbResponse = await userAccount.findOne(
                {$or:[
                    {"email":email},
                    {"userName":username},
                ],
            }).exec();
            
            return dbResponse; 
        } catch (error) {
            return {msg:error,status:"NOT_FOUND"}
        }
    },
    findByUserName:async function(username){
        try {
            let dbResponse = await userAccount.findOne(
                {$or:[
                    {"userName":username},
                ],
            }).exec();
            return dbResponse
        } catch (error) {
            return {msg:error,status:"NOT_FOUND"}
        }
    },
    findByUserId:async function(id){
        try {
            let dbResponse = await userAccount.findOne(
                {$or:[
                    {"_id":id},
                ],
            }).exec();
            return dbResponse
        } catch (error) {
            return {msg:error,status:"NOT_FOUND"}
        }
    },
    saveInDatabase:async function(modelName,dataObject){
        try {
            let dbResponse=await modelName.create(dataObject);
            return dbResponse
        } catch (error) {
            return {msg:error,status:"NOT_FOUND"}
        }
    },
    saveProduct:async function(productObject){
        try {
            let dbResponse=await productObject.save()
            return dbResponse
        } catch (error) {
            return {msg:error,status:"NOT_FOUND"}
        }
    },
    getProductByUserId:async function(userId){
        try {
            let dbResponse=await product.find({
                $or:[
                    {"userId":userId}
                ]
            }).exec()
            return dbResponse;
        } catch (error) {
            return {msg:error,status:"NOT_FOUND"}
        }
    },
    getProductByProductId:async function(productId){
        try {
            let dbResponse=await product.find({
                $or:[
                    {"_id":productId}
                ]
            }).exec()
            return dbResponse;
        } catch (error) {
            return {msg:error,status:"NOT_FOUND"}
        }
    },
    updateProductByProductId:async function(productId){
        try {
            let dbResponse=await product.findOneAndUpdate(
                {"_id":productId},{
                new: true
            }).exec()
            return dbResponse;
        } catch (error) {
            return {msg:error,status:"NOT_FOUND"}
        }
    },
    deleteProductByProductId:async function(productId){
        try {
            let dbResponse=await product.findOneAndDelete(
                {"_id":productId}).exec()
            return dbResponse;
        } catch (error) {
            return {msg:error,status:"NOT_FOUND"}
        }
    }
}

module.exports={
    dbUtils,
}