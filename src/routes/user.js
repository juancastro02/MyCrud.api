const { Router } = require('express')
const express = require('express')
const router = express.Router()
const Controller = require('../controllers/userController')

// register a user
router.post('/create', Controller.CreateUser)

// login a user
router.post('/login', Controller.loginUser)

// create admin user
router.post('/admin', Controller.CreateAdmin)

// send a email to reset the pass
router.post('/forgot', Controller.ForgotPass)

// to reset the password
router.post('/reset/:id', Controller.resetPass)
module.exports = router