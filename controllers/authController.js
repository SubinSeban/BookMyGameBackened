const USERS = require("../models/userModel");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const doSignUp = (req, res) => {
bcrypt.hash(req.body.password, parseInt(process.env.SALT_ROUNDS), function(err,hash){
  USERS({
    name: req.body.name,
    email: req.body.email,
    password: hash,
  })
    .save()
    .then((response) => {
      res.status(200).json({ message: "signup successfull please signin" });
    })
    .catch((error) => {
      console.log(error);
      if (error.code === 11000) {
        res
          .status(500)
          .json({ message: `${req.body.email} is already existing please Signin` });
      }else{
      res.status(500).json({ message: `somthing went wrong ` });
      }
    });
})
  
};



const doLogin =async  (req, res) => {
  try{
    const {email, password}=req.body
    
      userData =  await USERS.findOne({email:email})
      if(userData){
       bcrypt.compare(password,userData.password,(err,result)=>{
        if(result){
          userData.password=undefined
          const options = {
            expiresIn:'2d',
            algorithm:'HS256'
          }
          const token =jwt.sign({...userData},process.env.JWT_PASSWORD,options)
          res.status(200).json({user:userData,token})
        }
       })
      }else{
        res.status(401).json({message:'Invalid credentials please signup'})
      }

  }catch{

  }

    };


module.exports = { doSignUp, doLogin };
