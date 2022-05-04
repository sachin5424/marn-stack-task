const {check}= require('express-validator');
const db = require('../model/model');
const bcrypt = require('bcryptjs')

const errorMessage={
    required:'This is a required field'
}
exports.userRegisterValidation =  [
    check('username').notEmpty().withMessage(errorMessage.required)
    .isLength({min:3,max:100}).withMessage('username must be at least 3 characters')
    .custom(async(value)=>{
        return db.userModel.findOne({username: value}).then((data)=>{
            if(data) throw new Error(`${value} is already registered`)
        })
    })
    ,
    check('email').notEmpty().withMessage(errorMessage.required)
    .custom(async(value)=>{
        return db.userModel.findOne({email: value}).then((data)=>{
            if(data) throw new Error(`${value} is already registered`)
        })
    })
    ,
    check('password').notEmpty().withMessage(errorMessage.required)
    .isString()
    .isLength({ min: 8 }).withMessage('password must be at least 8 characters')
    .not()
    .isLowercase().withMessage('atlases must be lowercase')
    .not()
    .isUppercase().withMessage('atlases must be uppercase')
    .not()
    .isNumeric().withMessage('atlases must be numeric')
    .not()
    .isAlpha().withMessage('atlases must be alpha'),
];

exports.userLogin = [
    check('email').notEmpty().withMessage(errorMessage.required)
    .custom((value)=>{
        return db.userModel.findOne({email:value}).then((data)=>{
            if(!data) throw new Error(`${value} email not register`)
        })
    }),
    check('password').notEmpty().withMessage(errorMessage.required)
    .custom((value,{req})=>{
        return db.userModel.findOne({email:req.body.email}).then(async(data)=>{
            if(data){
                const check_password = await bcrypt.compare(value,data.password);
                if(check_password === false){
                     throw new Error(`invalid password`)
                }
            }
        })
    })

]
