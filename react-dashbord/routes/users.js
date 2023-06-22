const express = require("express");
const router = express.Router();
const { login, register, current } = require("../controllers/users");
const { auth } = require("../midleware/auth");

/* полный путь часть из app.js /api/user + /login  */
// через req мы имеем доступ к header \ body / params и т.д.
// res - то что мы ответим
router.post("/login", login);
router.post("/register", register);
router.get("/current", auth, current);

module.exports = router;
