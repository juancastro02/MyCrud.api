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

module.exports = router