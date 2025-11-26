const express = require("express");
const {
  getInstructors,
  addInstructor,
  deleteInstructor,
} = require("../controllers/instructorController");
const { checkAdmin } = require("../middleware/checkAdmin");
const { checkAuth } = require("../middleware/checkAuth");

const router = express.Router();

router.get("/", checkAuth, checkAdmin, getInstructors);
router.post("/add", checkAuth, checkAdmin, addInstructor);
router.delete("/delete/:id", checkAuth, checkAdmin, deleteInstructor);

module.exports = router;
