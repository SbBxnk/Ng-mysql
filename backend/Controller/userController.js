const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const TOKEN = process.env.ACCESS_TOKEN;
const EMAIL = process.env.FORGOT_EMAIL;
const PASSWORD = process.env.FORGOT_PASSWORD;
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')


const getAllUser = (req, res) => {
    User.getAllUser((error, result) => {
        if (error) {
            console.error(`Error executing query: ${error}`);
            return res.status(500).send({ status: false, error: 'Database query failed' });
        }
        if (result.length === 0) {
            return res.status(404).send({ status: false, error: 'Users not found!' });
        }
        return res.send({ status: true, data: result });
    });
};


const SignUpUser = (req, res) => {
    const UserDetail = req.body;
    User.findUserByEmail(UserDetail.email, async (error, result) => {
        if (error) {
            console.error(`Error executing query: ${error}`);
            return res.status(500).send({ status: false, error: 'Database query failed' });
        }
        if (result.length > 0) {
            return res.status(400).send({ status: false, error: 'Email already exists!' });
        }

        User.SignUpUser(UserDetail, (error, result) => {
            if (error) {
                console.error(`Error executing query: ${error}`);
                return res.status(500).send({ status: false, error: 'Database query failed' });
            }
            return res.send({ status: true, message: 'SignUp successfully!' });
        });
    });
};

const LoginUser = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        console.log('Email or password is missing');
        return res.status(400).send({ status: false, error: 'Email and password are required!' });
    }

    console.log(`Attempting to log in with email: ${email}`);

    User.loginUser(email, (error, result) => {
        if (error) {
            console.error(`Error executing query: ${error}`);
            return res.status(500).send({ status: false, error: 'Database query failed' });
        }

        if (result.length === 0) {
            console.log(`No user found with email: ${email}`);
            return res.status(400).send({ status: false, error: 'User not found!' });
        }

        const user = result[0];
        console.log(`User found: ${JSON.stringify(user)}`);

        var payload = {
            user: user.fname,
            email: user.email

        }

        const token = jwt.sign(payload, TOKEN, { expiresIn: '1h' });

        return res.send({
            status: true,
            message: 'Login successful!',
            token,
            user: {
                fname: user.fname,
            }
        });
    });
};

// var transporter = nodemailer.createTransport({
//     service: 'email',
//     auth: {
//         user: EMAIL,
//         password: PASSWORD
//     }
// })



// const forgotPassword = (req, res) => {
//     const { email, password } = req.body;
//     User.forgotPassword(email, (error, result) => {
//         if (error) {
//             console.error(`Error executing query: ${error}`)
//             return res.staus(500).send({ status: false, error: `Database query failed` })
//         }
//         if (result.length === 0) {
//             return res.status(404).send({ status: false, error: 'Users not found!' })
//         } else
//             if (result.length <= 0) {
//                 return res.status(200).send({ status: true, message: 'Password send successfully to your email' })
//             } else {
//                 var mailOption = {
//                     from: EMAIL,
//                     to: result[0].email,
//                     subject: `Password by EmployeeManagement System`
//                 }
//                 transporter.sendMail(mailOption, (error, info) => {
//                     if (error) {
//                         console.log(error)
//                     } else {
//                         console.log(`Email sent:` + info.response)
//                     }
//                 })
//             }
//     })
// }

module.exports = { SignUpUser, getAllUser, LoginUser };
