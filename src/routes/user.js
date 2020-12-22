const { Router } = require('express')
const express = require('express')
const router = express.Router()
const Controller = require('../controllers/userController')

router.get('/', Controller.CreateUser)

module.exports = router