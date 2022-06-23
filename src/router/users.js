const express = require("express");
const { register, login, list, update, detail, remove, create, verifyUser, checkPassword, updatePassword } = require("../controller/user")

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', list);
router.post('/users', create);
router.post('/users/:id', checkPassword);
router.put('/users/:id/password', updatePassword);
router.put('/users/:id', update);
router.get('/users/:id', detail);
router.delete('/users/:id', remove);
router.get("/users/:id/:token", verifyUser);


module.exports = router;