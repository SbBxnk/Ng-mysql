const crypto = require('crypto');

const generateToken = () => {
    return crypto.randomBytes(64).toString('hex');
};

console.log('Generated Token:', generateToken());
