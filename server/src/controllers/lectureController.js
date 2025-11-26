const Lecture = require("../models/Lecture");
const Course = require("../models/Course");
const User = require("../models/User");

exports.addLecture = async (req, res) => {
  try {
    const { courseId, instructorId, date, time } = req.body;

    if (!courseId || !instructorId || !date || !time) {
      return res.status(400).json({
        message:
          "All fields (courseId, instructorId, date, time) are required.",
      });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    const instructor = await User.findById(instructorId);
    if (!instructor || instructor.role !== "instructor") {
      return res.status(404).json({ message: "Instructor not found." });
    }

    const clash = await Lecture.findOne({ instructorId, date });

    if (clash) {
      return res.status(400).json({
        message:
          "Instructor is already assigned to another lecture on this date.",
      });
    }

    const lecture = await Lecture.create({
      courseId,
      instructorId,
      date,
      time,
    });

    res.status(201).json({
      message: "Lecture created successfully.",
      lecture,
    });
  } catch (error) {
    console.error("Add Lecture Error:", error);
    res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
};

exports.getLectures = async (req, res) => {
  try {
    const lectures = await Lecture.find()
      .populate("courseId", "name")
      .populate("instructorId", "name");

    if (lectures.length === 0) {
      return res.status(404).json({ message: "No lectures found." });
    }

    res.status(200).json({ lectures });
  } catch (error) {
    console.error("Get Lectures Error:", error);
    res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
};

exports.getInstructorLectures = async (req, res) => {
  try {
    const instructorId = req.params.id;

    const lectures = await Lecture.find({ instructorId }).populate(
      "courseId",
      "name level"
    );

    res.status(200).json({ lectures });
  } catch (error) {
    console.error("Instructor Lectures Error:", error);
    res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
};

exports.deleteLecture = async (req, res) => {
  try {
    const { id } = req.params;

    const lecture = await Lecture.findById(id);
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found." });
    }

    await Lecture.findByIdAndDelete(id);

    res.status(200).json({
      message: "Lecture deleted successfully.",
      lectureId: id,
    });
  } catch (error) {
    console.error("Delete Lecture Error:", error);
    res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
};
