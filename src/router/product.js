const Router = require("express");
const { create, remove, update, detail, list } = require("../controller/product");

const router = Router();

router.post("/products", create);
router.get("/products", list);
router.get("/products/:id", detail);
router.put("/products/:id", update);
router.delete("/products/:id", remove);


module.exports = router;