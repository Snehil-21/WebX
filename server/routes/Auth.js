const express = require('express');
const cors = require('cors');
const router = express.Router();

const controller = require('../controllers/Auth');

router.use(express.json());
// router.use(cookieParser());
router.use(cors());
router.use(express.urlencoded({ extended: false }));

const { signupUser, loginUser } = controller;

router.post('/signup', signupUser);
router.post('/login', loginUser);

module.exports = router;