const mongoose = require('mongoose');

const tokenSchema = mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Orders",
  },
  email: {
    type: String,
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    expires: "5m",
    default: Date.now
  }
})
module.exports = mongoose.model("Token", tokenSchema)