const User = require('../models/User');

exports.signupUser = async(req, res) => {
    const { fullName, email, username, password } = req.body();

    try {
        const userEmail = await User.findOne({email});
        if(userEmail) {
            res.status(200).json({success: false, message: 'Email already in use!'});
        }

        const userName = await User.findOne({username});
        if(userName) {
            res.status(200).json({success: false, message: 'Username already in use!'});
        }

        const user = new User({
            fullName, email, username, password
        });
        await user.save();
        return res.status(200).json({success: true, message: 'User signed up successfully!'})
    } catch (error) {
        return res.status(400).json({success: false, error: error.message});
    };
}