/**
  ____                _            _       
 |  _ \ _ __ ___   __| |_   _  ___| |_ ___ 
 | |_) | '__/ _ \ / _` | | | |/ __| __/ __|
 |  __/| | | (_) | (_| | |_| | (__| |_\__ \
 |_|   |_|  \___/ \__,_|\__,_|\___|\__|___/

*/

require('dotenv').config();
const express=require("express");
const app=express();
const router=express.Router();
const { check, validationResult } = require('express-validator')
/* ================ UTILS FILES  =================*/
const BASIC_UTILS=require("../../utils/basicUtils");
const DB=require("../../utils/dbUtils");

/* ================ CONSTANTS  FILES  =================*/
const { HTTPStatusCode }=require("../../constants/network");

/* ================ MODELS FILES  =================*/
const userAccount=require("../../models/userAccount");
const products=require("../../models/products");

/* ================ CORE FILES  =================*/
const auth=require("../../core/users/usersAuth");



router.delete("/:productId",auth.userAuth.isLoggedIn,async (req,res)=>{
    let responseCode,responseMessage,responseData;
    const userId=res.locals.user.userId;
    const productId=req.params.productId;
    try {
        const productDetails=await DB.dbUtils.getProductByProductId(productId);  //GET PRODUCTS DETAILS
        if(userId!==productDetails[0].userId.toString()){
            responseCode=HTTPStatusCode.FORBIDDEN;
            responseData="USER NOT AUTHENTICATED.";
            responseMessage=HTTPStatusCode.FORBIDDEN
        }else{
            const deleteResponse=await DB.dbUtils.deleteProductByProductId(productId)  // DELETE PRODUCT BY PRODUCTID
            if(deleteResponse){
                responseCode=HTTPStatusCode.OK;
                responseData="PRODUCT IS DELETED.";
                responseMessage=HTTPStatusCode.OK
            }else{
                responseCode=HTTPStatusCode.NOT_FOUND;
                responseData="PRODUCT ID NOT FOUND.";
                responseMessage=HTTPStatusCode.NOT_FOUND
            }
        }
    } catch (error) {
        responseCode=HTTPStatusCode.INTERNAL_SERVER_ERROR;
        responseData=error.toString();
        responseMessage=HTTPStatusCode.INTERNAL_SERVER_ERROR
    }finally{
        return res.status(responseCode).send({message:responseMessage,data:responseData})
    }
});

module.exports=router;