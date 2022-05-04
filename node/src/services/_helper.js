const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

const PasswordHash = async (password) => {
 return new Promise(async(resolve, reject) => {
      try {
          const hashPassword = await bcrypt.hashSync(password,salt);
          if(hashPassword){
              resolve(hashPassword)
          }
          else{
              reject('try again')
          }
      } catch (error) {
          reject(error);
      }
 })
};

const aggregate = (model,filter) =>{
    return new Promise((resolve,reject)=>{
       
        model.aggregate(
            filter
        ).exec( function (err, invites) {
            if (err) {
             reject(err)
            }
            resolve(invites)
          }
        );
    })  
}




module.exports ={PasswordHash,aggregate};


