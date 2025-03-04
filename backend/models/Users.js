const {DataTypes} = require('sequelize');
const sequelize = require("../config/db");

const Users = sequelize.define("Users",{
    id:{type:DataTypes.UUID,defaultValue:DataTypes.UUIDV4,primaryKey:true},
    name:{type:DataTypes.STRING,allowNull:false},
    email:{type:DataTypes.STRING,allowNull:false,unique:true},
    password:{type:DataTypes.STRING,allowNull:false},
    role:{type:DataTypes.ENUM("farmer","buyer","Admin"),allowNull:false},
    phone:{type:DataTypes.STRING,allowNull:false},
    location:{type:DataTypes.STRING,allowNull:false}
})

module.exports = Users;