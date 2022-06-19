const express = require("express");
const { list, create, redeem, update, remove, read, sendCoupon } = require("../controller/coupon");

const router = express.Router();

router.get("/coupon", list);
router.get("/coupon/:id", read);
router.get("/coupon/send/:id", sendCoupon);
router.post("/coupon", create);
router.post("/coupon/redeem", redeem);
router.put("/coupon/:id", update);
router.delete("/coupon/:id", remove);

module.exports = router