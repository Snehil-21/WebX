const Admin = require('../models/Admin');
const Product = require('../models/Product');

exports.getAllProducts = async(req, res) => {
    try{
        const allProducts = await Product.find();
        if(allProducts.length == 0) {
            return res.status(200).json({success: false, message: 'No products found in the shop!'})
        }
        // allProducts.populate('addedBy')
        return res.status(200).json({success: true, message: allProducts})
    } catch(error) {
        res.status(400).json({success: false, message: error.message});
    };
}

exports.addProduct = async(req, res) => {
    const { productTitle, productPrice, quantity, description, picUrl, adminEmail } = req.body;
    try {
        const isProduct = await Product.findOne({productTitle});
        
        if(isProduct) {
            return res.status(200).json({success: false, message: 'Product already present in shop!'});
        }
        
        const isAdmin = await Admin.findOne({ email: adminEmail })
        if(!isAdmin) {
            return res.status(200).json({success: false, message: 'Only admins can add a product into the shop.'});
        }

        const product = new Product({
            productTitle, productPrice, inStock: quantity, description, productPic: picUrl, addedBy: isAdmin._id
        });
        await product.save();
        return res.status(200).json({success: true, message: 'Product added successfully!'})
    } catch (error) {
        return res.status(400).json({success: false, error: error.message});
    };
}