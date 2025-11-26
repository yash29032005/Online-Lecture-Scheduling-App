const express = require("express");
const {
  addCourse,
  getCourse,
  deleteCourse,
} = require("../controllers/courseController");
const { checkAuth } = require("../middleware/checkAuth");
const { checkAdmin } = require("../middleware/checkAdmin");

const router = express.Router();

router.get("/", checkAuth, checkAdmin, getCourse);
router.post("/add", checkAuth, checkAdmin, addCourse);
router.delete("/delete/:id", checkAuth, checkAdmin, deleteCourse);

module.exports = router;
