const {DataTypes} = require("sequelize");
const sequelize = require("../config/db");

const Products = sequelize.define("Products",{
    id:{type:DataTypes.UUID,defaultValue:DataTypes.UUIDV4,primaryKey:true},
    name:{type:DataTypes.STRING,allowNull:false},
    category:{type:DataTypes.STRING,allowNull:false},
    description:{type:DataTypes.TEXT},
    price:{type:DataTypes.FLOAT,allowNull:false},
    imageUrl:{type:DataTypes.STRING},
    userId:{type:DataTypes.UUID,allowNull:false}
});

module.exports= Products;