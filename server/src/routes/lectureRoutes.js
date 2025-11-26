const express = require("express");
const router = express.Router();

const {
  addLecture,
  getLectures,
  getInstructorLectures,
  deleteLecture,
} = require("../controllers/lectureController");
const { checkAuth } = require("../middleware/checkAuth");
const { checkAdmin } = require("../middleware/checkAdmin");

router.get("/", checkAuth, getLectures);
router.get("/instructor/:id", checkAuth, getInstructorLectures);
router.post("/add", checkAuth, checkAdmin, addLecture);
router.delete("/delete/:id", checkAuth, checkAdmin, deleteLecture);

module.exports = router;
