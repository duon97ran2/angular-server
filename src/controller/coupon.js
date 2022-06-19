const Coupon = require("../model/coupon")
const sendEmail = require("../utils/email")

module.exports = {
  create: async (req, res) => {
    try {
      const coupon = await new Coupon(req.body).save();
      res.status(200).json(coupon)
    } catch (error) {
      console.log(error)
      res.status(400).json("Tạo mã giảm giá thất bại")
    }
  },
  list: async (req, res) => {
    try {
      const coupon = await Coupon.find().populate("valid_users.userId").exec();
      res.status(200).json(coupon)
    } catch (error) {
      console.log(error)
      res.status(400).json("Lấy danh sách mã giảm giá thất bại")
    }
  },
  read: async (req, res) => {
    try {
      const coupon = await Coupon.findOne({ _id: req.params.id }).exec();
      res.status(200).json(coupon)
    } catch (error) {
      console.log(error)
      res.status(400).json("Lấy danh sách mã giảm giá thất bại")
    }
  },
  sendCoupon: async (req, res) => {
    try {
      const coupon = await Coupon.findOne({ _id: req.params.id }).populate("valid_users.userId").exec();
      coupon.valid_users.forEach(async (user) => {
        await sendEmail(user.userId.email, "Gửi tặng khách hàng thân thiết mã giảm giá từ cửa hàng chúng tôi", `Xin chào ${user.userId?.username}, chúng tôi xin phép gửi tặng bạn mã giảm giá ${coupon.name}. Hãy truy cập vào trang web ${process.env.CLIENT_URL} và nhập mã "${coupon.code}" để sử dụng ngay nhé`)
      });
    } catch (error) {
      console.log(error)
      res.status(400).json("Lấy danh sách mã giảm giá thất bại")
    }
  },
  update: async (req, res) => {
    try {
      const coupon = await Coupon.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).exec();
      res.status(200).json(coupon)
    } catch (error) {
      console.log(error)
      res.status(400).json("Cập nhật mã giảm giá thất bại")
    }
  },
  remove: async (req, res) => {
    try {
      const coupon = await Coupon.findOneAndDelete({ _id: req.params.id }).exec();
      res.status(200).json(coupon)
    } catch (error) {
      console.log(error)
      res.status(400).json("Xóa mã giảm giá thất bại")
    }
  },
  redeem: async (req, res) => {
    try {
      const coupon = await Coupon.findOne({ code: req.body.code, "valid_users.userId": req.body.userId, status: 0 }).exec();
      if (!coupon) return res.status(400).json("Mã giảm giá này không được áp dụng cho tài khoản của bạn");
      if (!coupon.redeem_times) return res.status(400).json("Mã giảm giá này đã hết lượt sử dụng ");
      // await Coupon.findOneAndUpdate({ _id: coupon._id }, { redeem_times: coupon.redeem_times - 1, valid_users: coupon.valid_users.filter(user => user.userId != req.body.userId) }).exec();
      res.status(200).json(coupon)
    } catch (error) {
      console.log(error)
      res.status(400).json("Áp mã giảm giá thất bại")
    }
  },


}