const express = require('express');
const app = express();
const _http = require('http');
const server = _http.createServer(app);
const userController =   require('./controller/user.controller');
const userValidator = require('./validations/user.validations');
const blogValidator = require('./validations/blog.validations')
// const {checkValidResponse} = require('./middleware/validations')
require('dotenv').config();
const cors = require('cors')

const {validationResult} = require('express-validator');
const blogController = require('./controller/blog.controller')

const mongoose = require('mongoose');
const jwtToken = require('./middleware/jwt')
// mongoose.connection("")


var mongoUrl = "mongodb+srv://sachin:URnb17mqFrVFqnT2@cluster0.fsuun.mongodb.net/Test?retryWrites=true&w=majority";


app.use(cors())
mongoose.connect(mongoUrl).then((data)=>{
    // console.log("");
    console.log("Mongoose default connection is open to ");
}).catch((err)=>{
    console.log(err);
})

app.use(express.json());
app.use('/private',jwtToken.JWT_TOKEN)



const checkValidResponse =  (req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({errors:errors.array({onlyFirstError:true})});
        }
        else{
            next()
        }
    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}


app.post('/register',userValidator.userRegisterValidation,
checkValidResponse
,userController.userRegister)



app.post('/login',userValidator.userLogin,checkValidResponse,userController.userLogin)

app.post('/private/create/blog',blogValidator.createBlog,checkValidResponse,blogController.createBlog)
app.get('/private/list/blog',blogController.listBlog)
app.get('/private/create/blog/:id',blogValidator.checkId,checkValidResponse,blogController.detailsBlog)
app.put('/private/create/blog/:id',blogValidator.createBlog,blogValidator.checkId,checkValidResponse,blogController.updateBlog)
app.delete('/private/create/blog/:id',blogValidator.checkId,checkValidResponse,blogController.deleteBlog)

server.listen(process.env.PORT||3001,()=>{
  
    console.log(`server run `);
})







