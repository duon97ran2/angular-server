const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = mongoose.Schema(
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
      default: 0
    },
    stock: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      default: "No description"
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    author: {
      type: String,
      required: true
    },
    status: {
      type: Number,
      default: 0
    }

  }, { timestamps: true }
);
productSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("product", productSchema)