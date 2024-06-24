const express = require('express');
const router = express.Router();
const User = require('../models/usermodel');
const bcrypt = require('bcrypt');


router.post('/users/signup',async(req,res) =>{
    try {
        const check = await User.find({signemail:req.body.email});
        if(check){
         return res.status(409).json({msg:"Email already exists",ok:!check});}
        const hashpass = await bcrypt.hash(req.body.password,10);

        const user = new User({
            name: req.body.name,
            signemail: req.body.email,
            password: hashpass,
        
           })
           const result = await user.save();
           console.log(result);
           res.status(200).json({user,result});
        
        
    } catch (error) {
       console.log(error); 
    }

});

router.post('/users/login',async(req,res) =>{
    try {
        const {email,password} = req.body;
        const user =await User.findOne({signemail:email});
        if(!user){
            return res.status(404).send({msg:"Not found",ok:false});
        }
        const check = await bcrypt.compare(password,user.password);
        if(!check){
        return  res.status(400).json({msg:"Password do not match",ok:check});
        }
        const Token = await user.generateToken();
        return res.status(200).json({token:Token,email:email,ok:true});
        } catch (error) {
        console.log(error);
    }
})

module.exports = router;