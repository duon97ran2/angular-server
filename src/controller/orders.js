const Orders = require("../model/orders");

module.exports = {
  create: async (req, res) => {
    try {
      const order = await new Orders(req.body).save();
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json("Tạo đơn thất bại")
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