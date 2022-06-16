const Orders = require("../model/orders");
const Token = require("../model/token")
const crypto = require("crypto");
const sendEmail = require("../utils/email")

module.exports = {
  create: async (req, res) => {
    try {
      const order = await new Orders(req.body).save();
      let token = await new Token({
        orderId: order._id,
        token: crypto.randomBytes(32).toString("hex")
      }).save();
      const message = `Cảm ơn bạn đã đặt hàng. Truy cập đường link này để xác nhận đơn:  ${process.env.CLIENT_URL}/verify/${order._id}/${token.token} `;
      await sendEmail(order.email, "Xác nhận đặt hàng", message);
      res.status(200).json(order);
    } catch (error) {
      console.log(error)
      res.status(500).json(error)
    }
  },
  verifyOrder: async (req, res) => {
    try {
      const order = await Orders.findOne({ _id: req.params.id }).exec();
      if (!order) return res.status(400).send("Đơn hàng không tồn tại");
      console.log(req.params.id, req.params.token);
      const token = await Token.findOne({ orderId: req.params.id, token: req.params.token }).exec();
      if (!token) return res.status(400).send("Token đã hết hạn hoặc không tồn tại");
      await Orders.updateOne({ _id: order._id }, { $set: { status: 1 } });
      res.status(200).send({ message: "Đơn hàng của bạn đã được xác nhận,chúng tôi sẽ giao hàng cho bạn trong thời gian sớm nhất" });
      await Token.findOneAndDelete({ _id: token._id }).exec();
    } catch (error) {
      res.status(400).json(error)
    }
  },
  list: async (req, res) => {
    try {
      const order = await Orders.find({ status: { $ne: 4 } }).exec();
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json("Lấy danh sách thất bại")
    }
  },
  cancelList: async (req, res) => {
    try {
      const order = await Orders.find({ status: 4 }).exec();
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json("Lấy danh sách thất bại")
    }
  },
  update: async (req, res) => {
    try {
      const order = await Orders.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).exec();
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json("Cập nhật đơn thất bại")
    }
  },
  remove: async (req, res) => {
    try {
      const order = await Orders.findOneAndDelete({ _id: req.params.id }).exec();
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json("Xóa đơn thất bại")
    }
  },
  detail: async (req, res) => {
    try {
      const order = await Orders.findOne({ _id: req.params.id }).exec();
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json(error);
    }
  }


}