const {check,param} = require('express-validator');
const db  = require('../model/model')

exports.createBlog = [
    check('title').notEmpty(),
    check('description').notEmpty(),
]


exports.checkId = [
  param('id').custom((value)=>{
   return db.blogModel.findOne({id: value}).then((data)=>{
       if(!data) throw new Error(`${value} not found`)
   })
  })
]