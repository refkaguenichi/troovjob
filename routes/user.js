const express = require("express");
const router = express.Router();
const isAuth= require("../middlewares/isAuth")

const {
  getAllUsers,
  getOneUser,
  editUser,
  deleteUser,
} = require("../controllers/user.controllers");

router.get("/", getAllUsers);
router.get("/:id", getOneUser);
router.put("/:id", isAuth, editUser);
router.delete("/:id", isAuth, deleteUser);



module.exports = router;