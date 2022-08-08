const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/auth.controllers");
const { validate, registerValidate, loginValidate } = require("../middlewares/validate");

router.post("/register", registerValidate(), validate, register);

router.post("/login", loginValidate(), validate, login);


module.exports = router;