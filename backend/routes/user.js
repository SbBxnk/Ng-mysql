const express = require('express')
const router = express.Router()
const { getAllUser,SignUpUser,LoginUser } = require('../Controller/userController')


router.get('/user', getAllUser) //read
router.post('/regis', SignUpUser) //signup
router.post('/login', LoginUser) //login
// router.post('/forgotPassword', forgotPassword) //forgot password



module.exports = router;
