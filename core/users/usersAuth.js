const jwt=require("jsonwebtoken");
require("dotenv").config();


const userAuth={
    isLoggedIn:async function(req,res,next){
        try {
            let token=req.headers.authorization.split(' ')[1];   //SPLITTING THE BEARER TOKEN
            if(!token) return res.status(400).json({error:"TOKEN REQUIRED FOR AUTHENTICATION."})
            else{
                let profileData=await jwt.verify(token,process.env.PRIVATE_TOKEN);
                res.locals.token=token;
                res.locals.user=profileData;
                next();
            }
        } catch (error) {
            return res.status(401).json({error:"PLEASE AUTHENTICATE."})
        }
    }
}

module.exports={
    userAuth
}