const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.signupUser = async(req, res) => {
    const { fullName, email, username, password } = req.body;
    try {
        const userEmail = await User.findOne({email});
        if(userEmail) {
            res.status(200).json({success: false, message: 'Email already in use!'});
        }
        
        const userName = await User.findOne({username});
        if(userName) {
            res.status(200).json({success: false, message: 'Username already in use!'});
        }
        const hashPassword = bcrypt.hashSync(password, 8);
        
        const user = new User({
            fullName, email, username, hashPassword
        });
        await user.save();
        return res.status(200).json({success: true, message: 'User signed up successfully!'})
    } catch (error) {
        return res.status(400).json({success: false, error: error.message});
    };
}

exports.loginUser = async(req, res) => {
    const { username, password } = req.body;

    try{
        const user = await User.findOne({username});

        if(!user) {
            return res.status(200).json({success: false, message: 'No user found'});
        }

        if(await bcrypt.compare(password, user.hashPassword)) {
            return res.status(200).json({success: true, message: {fullName: user.fullName, email: user.email, username: user.username}})
        }
        return res.status(200).json({success: false, message: 'Incorrect username or password'})
    } catch(error) {
        res.status(400).json({success: false, message: error.message});
    }
}