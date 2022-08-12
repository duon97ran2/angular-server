const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  products: [
    {
      name: {
        type: String,
        required: true
      },
      image: {
        type: Array
      },
      price: {
        type: Number,
        required: true
      },
      newPrice: {
        type: Number,
        // default: 0
      },
      stock: {
        type: Number,
        // required: true
      },
      description: {
        type: String,
        // default: "No description"
      },
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        // required: true,
      },
      author: {
        type: String,
        // required: true
      },
      status: {
        type: Number,
        // default: 0
      },
      quantity: {
        type: Number
      },
      amount: {
        type: Number
      }
    }
  ],
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  status: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    required: true
  },
  amount_off: {
    type: Number,
    default: 0
  },
  shipping: {
    type: Number,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model("Orders", orderSchema)