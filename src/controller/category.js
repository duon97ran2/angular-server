const Category = require("../model/category");

module.exports = {
  create: async (req, res) => {
    try {
      const category = await new Category(req.body).save();
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json("Tạo danh mục thất bại");
    }
  },
  list: async (req, res) => {
    try {
      const category = await Category.find().exec();
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json("Lấy danh sách danh mục thất bại");
    }
  },
  detail: async (req, res) => {
    try {
      const category = await Category.findOne({ _id: req.params.id }).exec();
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json("Lấy thông tin danh mục thất bại");
    }
  },
  remove: async (req, res) => {
    try {
      const category = await Category.findOneAndDelete({ _id: req.params.id }).exec();
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json("Xóa danh mục thất bại");
    }
  },
  update: async (req, res) => {
    try {
      const category = await Category.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).exec();
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json("CẬp nhật danh mục thất bại");
    }
  },
}