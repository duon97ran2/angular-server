const express = require("express");
const { register, login, list, update, detail, remove } = require("../controller/user")

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', list);
router.put('/users/:id', update);
router.get('/users/:id', detail);
router.delete('/users/:id', remove);

module.exports = router;