const db = require('../model/model')
const {PasswordHash} = require('../services/_helper');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

require('dotenv').config()

exports.userRegister = async (req,res)=>{
    try {
        const payload = req.body;
        const password =await PasswordHash(payload.password);
        let options ={
            username:payload.username,
            email:payload.email,
            password:password
        }
        // await db.(options);
        await db.userModel.create(options)
        return res.status(200).json({message:"user create!",options})
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}


exports.userLogin = async (req,res)=>{
    try {
        const payload = req.body;
        const user = await db.userModel.findOne({email:payload.email})
        console.log(user,"???");
      
        const token = await jwt.sign({userId:user._id,email:user.email},'test');

        return res.status(200).json({token})
       
    } catch (error) {
        return res.status(500).json({error:error.message})
    }
}