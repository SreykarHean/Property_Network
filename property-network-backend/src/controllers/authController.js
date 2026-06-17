const authService = require('../services/authService')

const register = async (req, res, next) => {
  try {
    const { role } = req.params
    const user = await authService.register(role, req.body)
    res.status(201).json({ success: true, message: 'Registered successfully', data: user })
  } catch (err) {
    next(err)
  }
}

const login = async (req, res, next) => {
  try {
    const { role } = req.params
    const { email, password } = req.body
    const result = await authService.login(role, email, password)
    res.json({ success: true, message: 'Login successful', data: result })
  } catch (err) {
    next(err)
  }
}

module.exports = { register, login }