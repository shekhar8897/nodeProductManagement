require('dotenv').config();
const mongoose=require("mongoose");
require("mongoose-long")(mongoose);
const bcrypt = require('bcryptjs');
const jwt=require("jsonwebtoken");
const SchemaTypes=mongoose.Schema.Types;
const userAccount=mongoose.Schema(
    
        {
        userId: { 
            type: SchemaTypes.ObjectId,
            immutable:true,
        },
        name:{
            type:String,
            required:true,
            trim:true
        },
        userName:{
            type:String,
            unique:true,
            required:true,
            trim:true
        },
        email:{
            type:String,
            unique:true,
            required:true,
            trim:true,
            lowercase:true
        },
        password:{
            type:String,
            required:true,
            trim:true,
        },
        contact:{
            type:String,
            required:true,
            trim:true,
            minlength:10,
            maxlength:10
        },
        token:{
            type:String,
        },
    }, 
    {
    timestamps: true,
    }
)

userAccount.methods.toJSON=function(){
    try {
        const user=this;
        const userObject=user.toObject()

        delete userObject.password;
        return userObject;
    } catch (error) {
        return error;
    }
}


userAccount.methods.createToken=async function(userResponse){
    try{
        let payload={
            userId:this._id,
            userName:this.userName,
            name:this.name,
            password:this.password,
            email:this.email,
            contact:this.contact
        }
        const token="Bearer "+jwt.sign(
            payload,
            process.env.PRIVATE_TOKEN,
            {
                expiresIn:"2h"
            }
        )
        return token;
    }catch(error){
        return error;
    }
}

userAccount.pre('save',async function(next){
    const user=this;
    
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()

})

module.exports=mongoose.model('userAccounts',userAccount)