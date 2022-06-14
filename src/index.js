const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const productRouter = require("./router/product");
const userRouter = require("./router/users");
const categoryRouter = require("./router/category");
const orderRouter = require("./router/orders");


const app = express();
const fileUpload = multer();

app.use(morgan("tiny"));
app.use(express.json({ limit: "50mb" }));
dotenv.config({ path: __dirname + "/configs/settings.env" });

app.use(cors());

cloudinary.config({
  cloud_name: "duongtaph13276",
  api_key: "831576174189758",
  api_secret: "myuzqZ6y2rWll-TVIT6LO2aS43w",
});
app.use("/api", productRouter);
app.use("/api", userRouter);
app.use("/api", orderRouter);
app.use("/api", categoryRouter);
app.post('/api/upload', fileUpload.array('image', 5), function (req, res, next) {
  let streamUpload = (file) => {
    return new Promise((resolve, reject) => {
      let stream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (result) {
            resolve(result.secure_url)
          } else {
            reject(error)
          }
        }
      )
      streamifier.createReadStream(file.buffer).pipe(stream);
    });

  };
  async function upload(req) {
    try {
      console.log(req)
      const urls = [];
      const files = req.files;
      for (const file of files) {
        let result = await streamUpload(file);
        urls.push(result);
      }
      res.status(200).json(urls);
    } catch (error) {
      console.log(error)
    }

  }
  upload(req);
})


mongoose.connect(process.env.MONGODB_ONLINE).then(() => console.log("MONGODB connected successfully")).catch((error) => console.log(error));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT)
});