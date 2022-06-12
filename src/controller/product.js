const Product = require("../model/product");

module.exports = {
  create: async (req, res) => {
    try {
      const product = await new Product(req.body).save();
      res.status(201).json(product)
    } catch (error) {
      res.status(500).json("Thêm sản phẩm thất bại");
    }
  },
  remove: async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete({ _id: req.params.id }).exec();
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json("Xóa sản phẩm thất bại")
    }
  },
  update: async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }).exec();
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json("Cập nhật sản phẩm thất bại")
    }
  },
  list: async (req, res) => {
    try {
      const product = await Product.find().populate("category").exec();
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json("Lấy danh sách sản phẩm thất bại")
    }
  },
  listHome: async (req, res) => {
    try {
      const product = await Product.find().populate("category").limit(8).exec();
      const saleProduct = await Product.find({ status: 0, newPrice: { $ne: 0 } }).populate("category").exec();
      res.status(201).json({ product, saleProduct });
    } catch (error) {
      res.status(500).json("Lấy danh sách sản phẩm thất bại")
    }
  },
  detail: async (req, res) => {
    try {
      const product = await Product.findOne({ _id: req.params.id }).exec();
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json("Lấy danh sách sản phẩm thất bại")
    }
  },
  getByCategory: async (req, res) => {
    try {
      const product = await Product.find({ category: req.params.id }).populate("category").exec();
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json("Lấy danh sách sản phẩm thất bại")
    }
  }
}