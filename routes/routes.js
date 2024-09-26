const express = require("express");
const auth = require("../middleware/auth");
const Controller = require("./../controllers/controller");
const router = express.Router();
router.post("/login/dataapi", auth, Controller.postapi);
router.get("/login/dataapi", auth, Controller.getapi);
router.get("/login", Controller.login);
router.get("/loginInfo", auth, Controller.loginInfo);
module.exports = router;
