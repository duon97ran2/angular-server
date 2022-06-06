const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    image: {
      type: String
    },
    price: {
      type: Number,
      required: true
    },
    newPrice: {
      type: Number,
      default: 0
    },
    description: {
      type: String,
      default: "No description"
    }

  }, { timestamps: true }
);
productSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("product", productSchema)