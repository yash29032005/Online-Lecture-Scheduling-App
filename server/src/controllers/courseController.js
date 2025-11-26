const Course = require("../models/Course");

exports.addCourse = async (req, res) => {
  try {
    const { name, level, description, image } = req.body;

    if (!name || !level || !description || !image) {
      return res.status(400).json({
        message: "All fields (name, level, description, image) are required.",
      });
    }

    const existing = await Course.findOne({ name });
    if (existing) {
      return res.status(409).json({
        message: "Course with this name already exists.",
      });
    }

    const newCourse = await Course.create({
      name,
      level,
      description,
      image,
    });

    return res.status(201).json({
      message: "Course created successfully.",
      course: newCourse,
    });
  } catch (err) {
    console.error("Add Course Error:", err);
    res.status(500).json({
      message: "Internal server error.",
      error: err.message,
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    await Course.findByIdAndDelete(id);

    res.status(200).json({
      message: "Course deleted successfully.",
      courseId: id,
    });
  } catch (error) {
    console.error("Delete Courses Error:", error);
    res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const courses = await Course.find();

    if (courses.length === 0) {
      return res.status(404).json({ message: "No courses found." });
    }

    res.status(200).json({ courses });
  } catch (error) {
    console.error("Get Courses Error:", error);
    res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
};
