const express = require("express");
const { list, detail, update, create, remove, cancelList, verifyOrder, emailVerify, codeVerify } = require("../controller/orders");

const router = express.Router();

router.get("/orders", list);
router.get("/orders/:id/:token", verifyOrder);
router.get("/orders/cancel", cancelList);
router.post("/orders", create);
router.post("/orders/find-email", emailVerify);
router.post("/orders/find-order", codeVerify);
router.get("/orders/:id", detail);
router.put("/orders/:id", update);
router.delete("/orders/:id", remove);

module.exports = router;