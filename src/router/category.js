const express = require("express");
const { remove, create, list, detail, update } = require("../controller/category");


const router = express.Router();

router.post("/category", create);
router.get("/category", list);
router.delete("/category/:id", remove);
router.get("/category/:id", detail);
router.put("/category/:id", update);

module.exports = router;