const express = require('express');
const app = express();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const getHomePage = (req, res)=>{
    res.json("homepage");
}

const signup = async(req, res) => {
    try{
        const {name, username, email, password} = req.body;
        // const registeredUser = await User.findOne({email});
        const emailId = await User.findOne({email});
        // if(registeredUser.username){
        //     return res.status(409).json({message:"User of this username is already present ", success:false})   
        // }
        if(emailId){
             return res.status(409).json({message:"User of this email is already present ", success:false})
        }
       
        const user = new User({name, username, email, password});
        user.password = await bcrypt.hash(password, 10);
        await user.save();
        res.status(201).json({success:'data created successfully', success:true});
    }
    catch(error){
        res.status(500).json({message:"internal server error", error});
        throw(error);
    }   
}

const login = async(req, res) => {
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username});
        const id = user._id;
        if(!user){
            return res.status(401).json({message:"invalid username or password"});
        }
        const isPassword = await bcrypt.compare(password, user.password);
        // console.log(isPassword);
        if(!isPassword){
            return res.status(401).json({message:"invalid username or password"});
        }
        const jwtToken = jwt.sign(
            {username: user.username, _id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}

        ) 

        res.status(200).json({
            success:"Login success",
            jwtToken, 
            username,
            name: user.name,
            id:id
        })
    }
    catch(error){
        res.status(401).json({message:"invalid username or password"});
    }
}

// const getProducts = (req, res) => {
//     res.status(200).json(
//         {
//             name:"mobile",
//             price:20000
//         },
//         {
//             name:"bike",
//             price:100000
//         }
//     )
// }

module.exports = {
    getHomePage,
    signup,
    login

};
