const bcrypt = require('bcryptjs');

const jwt = require("jsonwebtoken");
const Users = require("../models/Users")

exports.register = async (req,res) =>{
    console.log("register request received");
    try{
        const {name,email,password,role,phone,location} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);

        if (!name || !email || !password || !role || !phone || !location) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await Users.create({
            name,
            email,
            password:hashedPassword,
            role,
            phone,
            location
        });
        res.status(201).json({message:"User registerd successfully",user});
    }catch(error){
        res.status(500).json({message:"error registering user",error:error.message});
    }
}

exports.login = async (req,res) =>{
    try{
        const {email,password} = req.body;
        const user = await Users.findOne({where:{email}});

        if(!user || !(await bcrypt.compare(password,user.password))){
            return res.statuse(401).json({message:"Invalied  email or password"});

        }
        const token = jwt.sign({userId:user.id,role:user.role},process.env.JWT_SECRET,{expiresIn:"1y"});
        res.json({message:"Login successful",token})
    } catch(error) {
        res.status(500).json({message:"Login failed",error});
    }
}