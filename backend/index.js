const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');
const sequelize = require('./config/db')

dotenv.config();
const app = express()
app.use(express.json)
app.use(cors());