const express = require('express');
const authRouter = express.Router();

const authController = require('../controllers/authController');
const jwt = require('../middleware/verifyToken');

authRouter
    .post('/login', authController.userLogin) // login route
    .post('/signup', authController.userSignup) // signup route
    .get('/userdetails', jwt.verifyToken, authController.getUserDetails) // userdetails route
    .get('/logout', jwt.verifyToken, authController.userLogout); // logout route

// exporting the authRouter
module.exports = authRouter;