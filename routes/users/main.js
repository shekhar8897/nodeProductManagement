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

const getRouter=require("./get");
const postRouter=require("./post");
const updateRouter=require("./update");
const deleteRouter=require("./delete");



router.use("/get",getRouter);
router.use("/post",postRouter);
/* 
router.use("/update",updateRouter);
router.use("/delete",deleteRouter); */


module.exports=router;