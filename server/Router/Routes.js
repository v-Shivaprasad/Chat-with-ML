const express = require('express');
const router = express.Router();
const User = require('../models/usermodel');
const bcrypt = require('bcrypt');


router.post('users/signup',async(req,res) =>{
    try {
        const hashpass = await bcrypt.hash(req.body.password,10);
        const user = new User({
            name: req.body.name,
            signemail: req.body.signemail,
            password: hashpass,
        
           })
           const result = await user.save();
           console.log(result);
           res.status(200).json({user,result});
        
        
    } catch (error) {
       console.log(error); 
    }

});

router.post('users/login',async(req,res) =>{
    try {
        const {email,password} = req.body;
        const user =await User.findOne({signemail:email});
        if(!user){
            return res.status(404).send("Not found");
        }
        const check = await bcrypt.compare(password,user.password);
        if(!check){
        return  res.status(400).json({check});
        }
        const Token = await user.generateToken();
        return res.status(200).json({token:Token});
        } catch (error) {
        console.log(error);
    }
})

module.exports = router;