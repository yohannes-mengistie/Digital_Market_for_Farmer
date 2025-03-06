const express = require("express");
const { createProduct, getAllProducts,deleteProduct } = require("../controllers/ProductController");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/uploadMiddleware");
const ProductRemove = require("../controllers/ProductRemove")

const router = express.Router();

router.post("/create", authMiddleware,upload.single("image"), createProduct);
router.get("/getallproduct", getAllProducts);
router.delete("/delete/:id",authMiddleware,deleteProduct);

module.exports = router;
