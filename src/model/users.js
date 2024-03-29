const mongoose = require('mongoose');
const crypto = require('crypto');
const uuid = require('uuid');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 12
  },
  salt: {
    type: String
  },
  role: {
    type: Number,
    default: 0
  },
  avatar: {
    type: Array,
    default: ['https://mdbootstrap.com/img/new/avatars/1.webp']
  },
  phone: {
    type: String,
  },
  username: {
    type: String
  },
  status: {
    type: Number,
    default: 1
  }
}, { timestamps: true })

userSchema.methods = {
  authenticate(password) {
    return this.password === this.passwordEncode(password);
  },
  passwordEncode(password) {
    if (!password) return
    try {
      return crypto.createHmac("sha256", this.salt).update(password).digest('hex');
    } catch (error) {
      console.log(error);
    }
  }
}
userSchema.pre("save", function (next) {
  this.salt = uuid.v4();
  this.password = this.passwordEncode(this.password);
  next();
})

module.exports = mongoose.model("users", userSchema);