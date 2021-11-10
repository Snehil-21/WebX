const express = require('express');
const cors = require('cors');
const router = express.Router();

const controller = require('../controllers/Product');;

router.use(express.json());
router.use(cors());
router.use(express.urlencoded({ extended: false }));

const { getAllProducts, addProduct, removeProduct, addToWishlist, getWishlistProducts } = controller;

router.get('/getAllProducts', getAllProducts);

router.post('/addProduct', addProduct);

router.post('/removeProduct', removeProduct);

router.post('/addToWishlist', addToWishlist);

router.post('/getWishlistProducts', getWishlistProducts);

module.exports = router;