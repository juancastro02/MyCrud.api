const { Router } = require('express')
const express = require('express')
const router = express.Router()
const Controller = require('../controllers/userController')

// register a user
router.post('/create', Controller.CreateUser)

// login a user
router.post('/login', Controller.loginUser)

module.exports = router