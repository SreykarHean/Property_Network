const express = require('express')
const router = express.Router()
const { registerBuyer, registerAgent, loginBuyer, loginAgent, loginAdmin } = require('../controllers/authController')

router.post('/register/buyer', registerBuyer)
router.post('/register/agent', registerAgent)
router.post('/login/buyer', loginBuyer)
router.post('/login/agent', loginAgent)
router.post('/login/admin', loginAdmin)

module.exports = router