const express = require('express')

// controller function
const { loginUser, signupUser } = require('../controllers/userController')

const router = express.Router()

// logon user
router.post('/login', loginUser)

// signup use
router.post('/signup', signupUser)

module.exports = router