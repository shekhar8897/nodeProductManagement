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


router.put("/:productId",[
    auth.userAuth.isLoggedIn,   // AUTH GUARD
    check("productsName").notEmpty().withMessage("productsName is required.").trim(),
    check("productPrice").notEmpty().withMessage("productPrice is required.").trim(),
    check("productVendor").notEmpty().withMessage("productVendor is required.").trim(),
    check("productQuantity").notEmpty().withMessage("productQuantity is required.").trim(),
    check("productWarranty").notEmpty().withMessage("productWarranty is required.").trim()
    ],async (req,res)=>{
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
            let getProductsDetails=await DB.dbUtils.updateProductByProductId(productId)  // UPDATE PRODUCT BY PRODUCT ID
            if(getProductsDetails){
                getProductsDetails.productsName=req.body.productsName;
                getProductsDetails.productPrice=req.body.productPrice;
                getProductsDetails.productVendor=req.body.productVendor;
                getProductsDetails.productQuantity=req.body.productQuantity;
                getProductsDetails.productWarranty=req.body.productWarranty;
                const updateResponse=await DB.dbUtils.saveProduct(getProductsDetails);
                responseCode=HTTPStatusCode.OK;
                responseData=updateResponse;
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