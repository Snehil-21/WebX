const express = require('express');
const cors = require('cors');
const router = express.Router();

const controller = require('../controllers/Auth');

router.use(express.json());
// router.use(cookieParser());
router.use(cors());
router.use(express.urlencoded({ extended: false }));

const { signupUser } = controller;

router.post('/signup', signupUser);

module.exports = router;