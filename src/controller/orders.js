const Orders = require("../model/orders");
const Token = require("../model/token");
const Coupon = require("../model/coupon")
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
      const message = `Cảm ơn bạn đã đặt hàng. Truy cập đường link này để xác nhận đơn:  ${process.env.CLIENT_URL}/verify/${order._id}/${token.token}/order `;
      const coupon = await Coupon.findOne({ _id: req.body.couponId });
      if (coupon) {
        await Coupon.findOneAndUpdate({ _id: coupon._id }, { redeem_times: coupon.redeem_times - 1, valid_users: coupon.valid_users.filter(user => user.userId != req.body.userId) }).exec();
      }
      sendEmail(order.email, "Xác nhận đặt hàng", message, order.products);
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
  emailVerify: async (req, res) => {
    try {
      const existOrders = await Orders.find({ email: req.body.email }).exec();
      if (!existOrders.length) return res.status(400).json("Khồng tồn tại đơn hàng nào của email này");
      const code = Math.random().toString(16).substr(2, 8);
      const token = await new Token({ token: code, email: req.body.email }).save();
      sendEmail(req.body.email, "Xác nhận email", `Mã xác nhận của bạn: ${code}`);
      res.status(200).json({ email: req.body.email });
    } catch (error) {
      res.status(200).json(error);
    }
  },
  codeVerify: async (req, res) => {
    try {
      const token = await Token.findOne({ token: req.body.code }).exec();
      if (!token) return res.status(400).send("Mã xác nhận không đúng hoặc đã hết hạn");
      const orders = await Orders.find({ email: token.email }).exec();
      await Token.findOneAndDelete({ _id: token._id }).exec();
      res.status(200).json(orders);
    } catch (error) {
      console.log(error)
      res.status(500).json(error)
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