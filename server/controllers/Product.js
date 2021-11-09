require('dotenv').config()
const cloudinary = require('cloudinary').v2

const Admin = require('../models/Admin');
const Product = require('../models/Product');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_KEY, 
    api_secret: process.env.CLOUD_SECRET,
    secure: true
})

exports.getAllProducts = async(req, res) => {
    try{
        const allProducts = await Product.find().populate('addedBy');
        if(allProducts.length == 0) {
            return res.status(200).json({success: false, message: 'No products found in the shop!'})
        }
    
        return res.status(200).json({success: true, message: allProducts})
    } catch(error) {
        res.status(400).json({success: false, message: error.message});
    };
}

exports.addProduct = async(req, res) => {
    const { productTitle, productPrice, quantity, description, productPic, adminEmail } = req.body;
    
    try {
        const admin = await Admin.findOne({email: adminEmail})
        const isProduct = await Product.findOne({productTitle, addedBy: admin._id});
        
        if(isProduct) {
            return res.status(200).json({success: false, message: 'Product already present in shop!'});
        }
        
        const isAdmin = await Admin.findOne({ email: adminEmail })
        if(!isAdmin) {
            return res.status(200).json({success: false, message: 'Only admins can add a product into the shop.'});
        }

        const cloudinaryRes = await cloudinary.uploader.upload(
            productPic,
            {
                upload_preset: 'customPreset',
                folder: 'shop_products',
                use_filename: true,
                unique_filename: false,
                // timeout: 60000,
            },
        )

        const product = new Product({
            productTitle, productPrice, inStock: quantity, description, productPic: cloudinaryRes.public_id, addedBy: isAdmin._id
        });
        await product.save();
        return res.status(200).json({success: true, message: 'Product added successfully!'})
    } catch (error) {
        console.log(error)
        return res.status(400).json({success: false, error: error.message});
    };
}

exports.removeProduct = async(req, res) => {
    const { deleteProductTitle, adminEmail } = req.body
    try {
        const isAdmin = await Admin.findOne({ email: adminEmail })
        if(!isAdmin) {
            return res.status(200).json({success: false, message: 'Only admins can delete a product from the shop.'});
        }

        const isValid = await Product.findOne({addedBy: isAdmin._id, productTitle: deleteProductTitle})

        if(!isValid) {
            return res.status(200).json({success: false, message: 'Could not proceed with the request.'});
        }

        const cloudinaryRes = await cloudinary.uploader.destroy(
            isValid.productPic
        )

        if(cloudinaryRes.result == "ok") {
            await Product.deleteOne({ productTitle: deleteProductTitle })
        }

        return res.status(200).json({success: true, message: 'Product deleted successfully!'})

    } catch (error) {
        console.log(error)
        return res.status(400).json({success: false, error: error.message})
    }
}