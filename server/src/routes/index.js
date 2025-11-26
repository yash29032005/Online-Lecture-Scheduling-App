const express = require("express");
const router = express.Router();

router.use("/auth", require("./authRoutes"));
router.use("/course", require("./courseRoutes"));
router.use("/instructor", require("./instructorRoutes"));
router.use("/lecture", require("./lectureRoutes"));

module.exports = router;
