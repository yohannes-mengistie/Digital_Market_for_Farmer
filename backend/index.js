const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');
const sequelize = require('./config/db');
const Users = require("./models/Users");
const auth = require("./controllers/auth");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
dotenv.config();
const app = express();
app.use(express.json())
app.use(cors());
app.use(express.urlencoded({ extended: true }));
// Serve static file from "uploads folder"
app.use("/uploads",express.static("uploads"));

// Sync Database 
sequelize.sync({force:false})
    .then(()=>{
        console.log("table created")

    }).catch((error) => console.log("error syncing database:" , error))

// authentication
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);



app.listen(process.env.PORT,()=> console.log(`server running on port ${process.env.PORT}`));