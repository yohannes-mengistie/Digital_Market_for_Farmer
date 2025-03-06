const jwt = require("jsonwebtoken");

module.exports = (req,res,next) => {
    const token = req.header("Authorization");
    if (!token || !token.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    const headerToken = token.split(" ")[1]?.trim();
    
    try{
        const verified = jwt.verify(headerToken,process.env.JWT_SECRET);

        req.user = verified;
        if (req.user.role !== "farmer" && req.method=== "create") {
            return res.status(403).json({ message: "Forbidden: Only farmers can create products" });
        }else if (req.user.role !== "farmer" && req.method === "delete"){
            return res.status(403).json({ message: "Forbidden: Only farmers can delet products" });
        }

        next();
    } catch(error){
        res.status(400).json({message:"Invalied Token"});
    }
};