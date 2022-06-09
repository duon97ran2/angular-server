const Router = require("express");
const { create, remove, update, detail, list, getByCategory } = require("../controller/product");

const router = Router();

router.post("/products", create);
router.get("/products", list);
router.get("/products/:id", detail);
router.put("/products/:id", update);
router.delete("/products/:id", remove);
router.get("/products/category/:id", getByCategory);


module.exports = router;