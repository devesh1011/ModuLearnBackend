const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config('../env')

// token verifier function
function verifyToken(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token has expired' });
            } else {
                return res.status(401).json({ message: 'Invalid token' });
            }
        }

        req.user = decoded;
        next();
    });
}

module.exports = {
    verifyToken
}