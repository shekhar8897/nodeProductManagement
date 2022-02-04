/*
 _   _               _
| | | |___  ___ _ __( )___
| | | / __|/ _ \ '__|// __|
| |_| \__ \  __/ |    \__ \
 \___/|___/\___|_|    |___/
*/

const express=require("express");
const app=express();
const router=express.Router();

/* ================ UTILS FILES  =================*/
const BASIC_UTILS=require("../../utils/basicUtils");
const DB=require("../../utils/dbUtils");

/* ================ CONSTANTS  FILES  =================*/
const { HTTPStatusCode }=require("../../constants/network");

/* ================ MODELS FILES  =================*/
const userAccount=require("../../models/userAccount");

/* ================ CORE FILES  =================*/
const auth=require("../../core/users/usersAuth");


router.get("/:userId",auth.userAuth.isLoggedIn,async(req,res)=>{
    let responseCode,responseMessage,responseData;
    let userId=req.params.userId;
    try{
        const userData=res.locals.user;
        if(userData.userId!==userId){
            responseCode = HTTPStatusCode.NOT_FOUND
            responseMessage = HTTPStatusCode.NOT_FOUND;
            responseData = "USER IS NOT AUTHENTICATED.";
        }else{
            let dbResponse = await DB.dbUtils.findByUserId(userId);  //FIND USER BY USERID
            if(!dbResponse){
                responseCode = HTTPStatusCode.FORBIDDEN
                responseMessage = HTTPStatusCode.FORBIDDEN;
                responseData = "INVALID PROFILE.";
            }else{
                responseCode = HTTPStatusCode.OK
                responseMessage = HTTPStatusCode.OK;
                responseData = dbResponse;
            }
        }
    }catch(error){
        responseCode = HTTPStatusCode.INTERNAL_SERVER_ERROR
        responseMessage = HTTPStatusCode.INTERNAL_SERVER_ERROR;
        responseData = error.toString();
    }finally{
        return res.status(responseCode ).send({message:responseMessage,data:responseData})
    }
})

module.exports=router;