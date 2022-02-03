/**
  ____                _            _       
 |  _ \ _ __ ___   __| |_   _  ___| |_ ___ 
 | |_) | '__/ _ \ / _` | | | |/ __| __/ __|
 |  __/| | | (_) | (_| | |_| | (__| |_\__ \
 |_|   |_|  \___/ \__,_|\__,_|\___|\__|___/

*/

const express=require("express");
const app=express();
const router=express.Router();


const getRouter=require("./get");
const postRouter=require("./post");
const updateRouter=require("./update");
const deleteRouter=require("./delete");


router.use("/post",postRouter);
router.use("/get",getRouter);
router.use("/update",updateRouter)
router.use("/delete",deleteRouter);
module.exports=router;