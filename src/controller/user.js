const User = require("../model/users");

module.exports = {
  register: async (req, res) => {
    try {
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

}