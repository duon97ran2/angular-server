const express = require("express");
const { list, detail, update, create, remove } = require("../controller/orders");

const router = express.Router();

router.get("/orders", list);
router.post("/orders", create);
router.get("/orders/:id", detail);
router.put("/orders/:id", update);
router.delete("/orders/:id", remove);

module.exports = router;