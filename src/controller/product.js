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
      const filter = {};
      const sort = {};
      if (req.query.sort) {
        if (req.query.sort == "date-new") {
          sort.createdAt = -1;
        }
        else if (req.query.sort == "date-old") {
          sort.createdAt = 1;
        }
        else if (req.query.sort == "price-asc") {
          sort.newPrice = 1;

        }
        else if (req.query.sort == "price-desc") {
          sort.newPrice = -1;
        }
      }
      if (req.query.price_range) {
        if (req.query.price_range == "50000-to-100000") {
          filter.newPrice = { $gte: 50000, $lte: 100000 };
        } else if (req.query.price_range == "over-100000") {
          filter.newPrice = { $gt: 100000 };
        } else if (req.query.price_range == "under-50000") {
          filter.newPrice = { $lt: 50000 };
        }
      }
      if (req.query.category) {
        const condition = JSON.parse(req.query.category);
        if (condition) {
          filter.category = condition;
        }
      }
      const product = await Product.find(filter).sort(sort).populate("category").exec();
      res.status(201).json(product);
    } catch (error) {
      console.log(error)
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
  },
  search: async (req, res) => {
    try {
      const query = req.query.q;
      const result = await Product.find({ name: { $regex: new RegExp(query), $options: "i" } }).populate("category").exec()
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json("Không tìm thấy kết quả")
    }
  },
}