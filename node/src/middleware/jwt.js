var jwt = require('jsonwebtoken');
var JWT_SECREATE_kEY = 'test';
const db = require('../model/model')
exports.JWT_TOKEN = async (req, res, next) => {
    try {
        // console.log(req.headers.authorization);
        var bearer = req.headers.authorization.split(" ");
        token = bearer[1];
        var decode = jwt.verify(token, JWT_SECREATE_kEY);
        console.error(decode,"??????");
        if (decode.userId) {
            req.userId = decode.userId
            req.userEmail = decode.email
            const data =await  db.userModel({userId: decode.userId});
            if (!data) {
                res.status(401).json({
                    status: 401,
                    message: "Failed to authenticate token."
                })
            }
            else {
                next()
            }
        }
    } catch (error) {
        res.status(401).json({
            status: 401,
            message: "Failed to authenticate token."
        })
    }
}
