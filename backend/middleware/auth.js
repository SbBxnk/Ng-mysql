const jwt = require('jsonwebtoken');
require('dotenv').config();
const TOKEN = process.env.ACCESS_TOKEN;

exports.auth = async (req, res, next) => {
    try {
        const token = req.headers['auth'];
        if (!token) {
            return res.status(401).send('No token provided!');
        }

        // Verify the token
        const decoded = jwt.verify(token, TOKEN);
        console.log(decoded);
        req.user = decoded.user;
        next();
        
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(401).send('Invalid token!');
    }
}
