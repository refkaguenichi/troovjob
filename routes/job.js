const express = require("express");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");

const {
  getAllJobs,
  getOneJob,
  editJob,
  deleteJob,
  postJob,
} = require("../controllers/job.controllers");

router.post("/", isAuth, postJob);
router.get("/", isAuth, getAllJobs);
router.get("/:id", isAuth, getOneJob);
router.put("/:id", editJob);
router.delete("/:id", isAuth, deleteJob);

module.exports = router;
