const Product = require("../models/Products");

exports.createProduct = async (req,res)=>{
    try{
        if(req.user.role !== "farmer"){
            return res.status(403).json({message:"Access denied. only farmer hase permisson"})
        }
        const {name,category,price,description} = req.body;
        const imageUrl = req.file?`/uploads/${req.file.filename}`:null;

        const product = await Product.create({
            name,
            category,
            price,
            description,
            imageUrl,
            userId:req.user.userId
        });
        res.status(201).json(product)

    }catch(error){
        res.status(500).json({message:"error creating product",error})
    }
};

exports.getAllProducts = async (req,res) =>{
    const products = await Product.findAll();
    res.json(products);
};


exports.deleteProduct = async (req,res) =>{
    try{
        const {id} = req.params;
        // check if the product is exist
        const product = await Product.findByPk(id);
        if (!product){
            return res.status(404).json({message:"product not found"});
        }

        // check if the user is the owner of that product
        if (req.user.role !== "farmer" || product.userId !== req.user.userId){
            return res.status(403).json({message:"Forbidden: you can only delete your product"})
        }

        // delete the product

        await product.destroy();
        res.status(200).json({message:"product is deleted successfully"});


    }catch(error){
        res.status(500).json({message:"internal server error",error});
    }
}