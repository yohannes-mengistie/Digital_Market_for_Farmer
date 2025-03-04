const { default: bcrypt } = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../models/Users")

exports.register = async (req,res) =>{
    try{
        const {name,email,password,role} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);

        const user = await Users.create({
            name,
            email,
            password:hashedPassword,
            role,
        });
        res.status(201).json({message:"User registerd successfully",user});
    }catch(error){
        res.status(500).json({message:"error registering user",error});
    }
}

exports.login = async (req,res) =>{
    try{
        const {email,password} = req.body;
        const user = await Users.findOne({where:{email}});

        if(!user || !(await bcrypt.compare(password,user.password))){
            return res.statuse(401).json({message:"Invalied  email or password"});

        }
        const token = jwt.sign({userId:user.id,role:user.role})

    }
}