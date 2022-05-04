const {validationResult} = require('express-validator');

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


module.exports =checkValidResponse