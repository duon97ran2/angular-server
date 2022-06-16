const mongoose = require("mongoose");
const Product = require("../model/product");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  thumbnail: {
    type: Array
  },
  status: {
    type: Number,
    default: 0
  }
}, { timestamps: true })

// categorySchema.pre("findOneAndDelete", async function (data) {
//   try {
//     console.log(data._id)
//   } catch (error) {
//     console.log(error)
//   }

// })

module.exports = mongoose.model("Category", categorySchema);