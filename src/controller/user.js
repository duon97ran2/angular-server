const User = require("../model/users");

module.exports = {
  register: async (req, res) => {
    try {
      const existEmail = await User.findOne({ email: req.body.email }).exec();
      if (existEmail) return res.status(500).json("Tài khoản sử dụng email này đã tồn tại")
      const user = await new User(req.body).save();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json("Đăng kí thất bại")
    }
  },
  login: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email }).exec();
      if (!user) return res.status(400).json("Email không tồn tại")
      if (!user.authenticate(req.body.password)) return res.status(400).json("Password không chính xác")
      user.password = null;
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json("Đăng kí thất bại")
    }
  },
  update: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true }).exec();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json("Cập nhật thất bại")
    }
  },
  create: async (req, res) => {
    try {
      const existEmail = await User.findOne({ email: req.body.email }).exec();
      if (existEmail) return res.status(500).json("Tài khoản sử dụng email này đã tồn tại");
      const users = await new User(req.body).save();
      res.status(200).json(users)
    } catch (error) {
      res.status(500).json("Tạo người dùng thất bại")
    }
  },
  list: async (req, res) => {
    try {
      const users = await User.find().exec();
      res.status(200).json(users)
    } catch (error) {
      res.status(500).json("Lấy danh sách người dùng thất bại")
    }
  },
  remove: async (req, res) => {
    try {
      const users = await User.findByIdAndDelete({ _id: req.params.id }).exec();
      res.status(200).json(users)
    } catch (error) {
      res.status(500).json("Xóa người dùng thất bại")
    }
  },
  detail: async (req, res) => {
    try {
      const users = await User.findOne({ _id: req.params.id }).exec();
      res.status(200).json(users)
    } catch (error) {
      res.status(500).json("Lấy thông tin người dùng thất bại")
    }
  },


}