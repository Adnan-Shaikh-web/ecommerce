const User = require('../models/userModel.js');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const addUser = async (req, res) => {
    let user = req.body;
    let alreadyExists = false;

    // const genToken = (_id) => {
    //     const token = jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: '7d' });
    //     console.log(token);
    //     return token.toString();
    // }

    alreadyExists = await User.findOne({ email: user.email })

    try {

        if (alreadyExists) {
            return res.status(400).json({ error: 'User with same email already exists. Try logging in instead' })
        }

        if (!user.name && !user.email && !user.password) {
            return res.status(400).json({ error: "All fields are empty. Please fill all the fields" })
        }
        if (!user.name || !user.email || !user.password) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        if (!validator.isEmail(user.email)) {
            return res.status(400).json({ error: 'Enter a valid email' })
        }
        if (!validator.isStrongPassword(user.password)) {
            return res.status(400).json({ error: 'Enter a strong password. A strong password consists of a capital letter, a symbol and a number' })
        }


        const hash = await bcrypt.hash(user.password, 10);

        let data = new User({ name: user.name, email: user.email, password: hash });
        data.save()
        // const token = genToken(user._id);


        return res.status(200).json({ message: 'Sign In Successful, now please Log In' });
    }
    catch (error) {
        return res.status(500).json({ error: 'Server Error' });
    }

}


module.exports = { addUser }