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
const bcrypt = require('bcryptjs');

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




router.post("/addProduct",[
        auth.userAuth.isLoggedIn,   // AUTH GUARD
        check("productsName").notEmpty().withMessage("productsName is required.").trim(),
        check("productPrice").notEmpty().withMessage("productPrice is required.").trim(),
        check("productVendor").notEmpty().withMessage("productVendor is required.").trim(),
        check("productQuantity").notEmpty().withMessage("productQuantity is required.").trim(),
        check("productWarranty").notEmpty().withMessage("productWarranty is required.").trim()
    ],async(req,res)=>{
    let responseCode,responseMessage,responseData;
    const userId=res.locals.user.userId;
    try {
        if(!userId){
            responseCode=HTTPStatusCode.FORBIDDEN;
            responseData="USER NOT AUTHENTICATED.";
            responseMessage=HTTPStatusCode.FORBIDDEN
        } 
        else{
            const getUserDetails=await DB.dbUtils.findByUserId(userId);  // GETTING THE USER DETAILS
            if(getUserDetails){
                let productsData={
                    "userId":getUserDetails._id,
                    "productsName":req.body.productsName,
                    "productPrice":req.body.productPrice,
                    "productVendor":req.body.productVendor,
                    "productQuantity":req.body.productQuantity,
                    "productWarranty":req.body.productWarranty
                }
                let addProductResponse=await DB.dbUtils.saveInDatabase(products,productsData)     // ADD PRODUCTS IN DATABASE
                responseCode=HTTPStatusCode.CREATED;
                responseData=addProductResponse;
                responseMessage=HTTPStatusCode.CREATED
            }else{
                responseCode=HTTPStatusCode.NOT_FOUND;
                responseData="USER NOT FOUND.";
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

})

module.exports=router;