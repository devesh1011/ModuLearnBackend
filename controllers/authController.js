const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

const User = require('../models/User')

dotenv.config('../env');

// JWT Token Generation
const generateToken = (username) => {
    return jwt.sign({ username: username }, process.env.JWT_SECRET, {
        expiresIn: '24h'
    })
}

// Login function
async function userLogin(req, res) {
    try {
        const { username, password } = req.body;

        // Getting user from database
        const user = await User.findOne({ username });

        // check if user exists or not
        if (!user) {
            return res.status(401).json({ message: 'User with this username does not exists!' });
        }

        // match the req.password with user.password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid Password' });
        }

        // newToken generation
        const newToken = generateToken(username);

        user.token = newToken;

        user.save();

        res.status(201).json({ newToken, "success": true });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Signup function
async function userSignup(req, res) {
    try {
        const { username, email, password } = req.body;

        // Check if there is an existing user in database
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username is already taken' });
        }

        // Hashing the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Token generation
        const token = generateToken(username);

        // New User creation
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            token: token
        });

        // save the user to the database
        await newUser.save();

        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.errors });
    }
}

async function getUserDetails(req, res) {
    // Getting the usertoken from header
    const token = req.header('Authorization');

    try {
        // decoding the token
        var decoded = jwt.verify(token, process.env.JWT_SECRET)

        // extracting payload from token
        const username = decoded.username;

        // Findinf user in database
        const user = await User.findOne({ username });

        const userWithoutPassword = { ...user.toObject() }; // Convert the Mongoose document to a plain JavaScript object
        delete userWithoutPassword.password;

        res.json({ "user": userWithoutPassword });
    } catch (error) {
        console.log(error);
    }
}

async function userLogout(req, res) {
    // Getting the usertoken from header

    const token = req.header('Authorization');

    try {
        // decoding the token
        var decoded = jwt.verify(token, process.env.JWT_SECRET)

        // extracting payload from token
        const username = decoded.username;

        // Findinf user in database
        const user = await User.findOne({ username });

        // token to null
        user.token = null;
        user.save();

        res.json({ "message": "You have been logged out successfully", "success": true });
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    userLogin, userSignup, getUserDetails, userLogout
}