const mongoose = require('mongoose');

const tokenSchema = mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Orders",
    required: true
  },
  token: {
    type: String,
    required: true
  }
})
module.exports = mongoose.model("Token", tokenSchema)