const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  }
})

userSchema.pre('save', async function (next) {
  // can't use the arrow function, need non lexical this
  const user = this
  // 2. If it's a new user OR the users password has changed

  if (user.isModified('password') || user.isNew) {
    try {
      // 3. hash their password
      const hash = await bcrypt.hash(user.password, 10)
      // 10 is the salt rounds
      // 4. Set their password to be equal to the hash

      user.password = hash
      // 5. otherwise (not new user/passwrod hasn't changed)

      next()
    } catch (e) {
      next(e)
    }
  }
  // 6. Carry on
  next()
})

userSchema.methods.comparePassword = function (password) {
  const user = this
  // password = the password that comes from the request body
  // user.password = the stored hashed password in the database
  return bcrypt.compare(password, user.password)
}
const User = mongoose.model('User', userSchema)

module.exports = User
