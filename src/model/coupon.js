const mongoose = require('mongoose');

const couponSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    minLength: 5,
    required: true,
    unique: true,
  },
  amount_off: {
    type: Number,
    required: true
  },
  valid_users: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  status: {
    type: Number,
    default: 0,
  },
  redeem_times: {
    type: Number,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model("coupon", couponSchema)