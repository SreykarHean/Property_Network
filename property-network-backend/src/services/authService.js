const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Admin, Agent, Buyer } = require('../models')

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  })
}

const register = async (role, data) => {
  const hashedPassword = await bcrypt.hash(data.password, 10)
  data.password = hashedPassword

  if (role === 'buyer') return await Buyer.create(data)
  if (role === 'agent') return await Agent.create(data)
  if (role === 'admin') return await Admin.create(data)
  throw new Error('Invalid role')
}

const login = async (role, email, password) => {
  let user
  if (role === 'buyer') user = await Buyer.findOne({ where: { email } })
  else if (role === 'agent') user = await Agent.findOne({ where: { email } })
  else if (role === 'admin') user = await Admin.findOne({ where: { email } })
  else throw new Error('Invalid role')

  if (!user) throw new Error('User not found')

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) throw new Error('Invalid credentials')

  const idField = `${role}_id`
  const token = generateToken(user[idField], role)

  return { token, user }
}

module.exports = { register, login }