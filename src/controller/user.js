const User = require("../model/users");
const Token = require("../model/token");
const sendEmail = require("../utils/email")
const crypto = require("crypto");

module.exports = {
  register: async (req, res) => {
    try {
      const existEmail = await User.findOne({ email: req.body.email }).exec();
      if (existEmail) return res.status(500).json("Tài khoản sử dụng email này đã tồn tại");
      let token = await new Token({
        email: req.body.email,
        token: crypto.randomBytes(32).toString("hex")
      }).save();
      const user = await new User(req.body).save();
      const message = `Đăng ký thành công. Truy cập đường link này để xác nhận tài khoản:  ${process.env.CLIENT_URL}/verify/${user._id}/${token.token}/user `;
      await sendEmail(user.email, "Xác nhận tài khoản", message);
      res.status(200).json(user);
    } catch (error) {
      console.log(error)
      res.status(500).json("Đăng kí thất bại")
    }
  },
  verifyUser: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id }).exec();
      if (!user) return res.status(400).send("Người dùng không tồn tại");
      console.log(req.params.id, req.params.token);
      const token = await Token.findOne({ email: user.email, token: req.params.token }).exec();
      if (!token) return res.status(400).send("Token đã hết hạn hoặc không tồn tại");
      await User.updateOne({ _id: user._id }, { $set: { status: 0 } });
      res.status(200).send({ message: `Tài khoản của bạn đã được kích hoạt, hãy truy cập vào ${process.env.CLIENT_URL}/login để đăng nhập` });
      await Token.findOneAndDelete({ _id: token._id }).exec();
    } catch (error) {
      res.status(400).json(error)
    }
  },
  login: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email, status: 0 }).exec();
      if (!user) return res.status(400).json("Email không tồn tại hoặc chưa được kích hoạt")
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
  checkPassword: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id }).exec();
      if (!user) return res.status(400).json("Tài khoản không tồn tại hoặc chưa được kích hoạt")
      if (!user.authenticate(req.body.password)) return res.status(400).json("Mật khẩu không chính xác");
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json("Kiểm tra mật khẩu thất bại")
    }
  },
  updatePassword: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id }).exec();
      if (user.authenticate(req.body.newPassword)) return res.status(400).json("Mật khẩu mới không được trùng với mật khẩu cũ");
      const hashPassword = user.passwordEncode(req.body.newPassword);
      await User.findOneAndUpdate({ _id: req.params.id }, { password: hashPassword }, { new: true }).exec();
      user.password = null;
      res.status(200).json(user);
    } catch (error) {
      console.log(error)
      res.status(500).json("Đổi mật khẩu thất bại")
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