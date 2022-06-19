const express = require("express");
const { list, create, redeem, update, remove } = require("../controller/coupon");

const router = express.Router();

router.get("/coupon", list);
router.post("/coupon", create);
router.post("/coupon/redeem", redeem);
router.put("/coupon/:id", update);
router.delete("/coupon/:id", remove);

module.exports = router