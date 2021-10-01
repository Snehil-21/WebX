const express = require('express');
const cors = require('cors');
const router = express.Router();

const controller = require('../controllers/Product');

router.use(express.json());
router.use(cors());
router.use(express.urlencoded({ extended: false }));

const { addProduct } = controller;

router.post('/addProduct', addProduct);

module.exports = router;