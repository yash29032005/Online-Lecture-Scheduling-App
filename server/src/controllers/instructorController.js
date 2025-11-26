const User = require("../models/User");

exports.addInstructor = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields (name, email, password) are required.",
      });
    }

    // Check existing
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({
        message: "Instructor with this email already exists.",
      });
    }

    // Create instructor
    const instructor = await User.create({
      name,
      email,
      password, // TODO: hash password if needed
      role: "instructor",
    });

    res.status(201).json({
      message: "Instructor added successfully.",
      instructor,
    });
  } catch (error) {
    console.error("Add Instructor Error:", error);
    res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
};

exports.deleteInstructor = async (req, res) => {
  try {
    const { id } = req.params;

    const instructor = await User.findById(id);

    if (!instructor || instructor.role !== "instructor") {
      return res.status(404).json({ message: "Instructor not found." });
    }

    await User.findByIdAndDelete(id);

    res.status(200).json({
      message: "Instructor deleted successfully.",
      instructorId: id,
    });
  } catch (error) {
    console.error("Delete Instructor Error:", error);
    res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
};

exports.getInstructors = async (req, res) => {
  try {
    const instructors = await User.find({ role: "instructor" });

    if (instructors.length === 0) {
      return res.status(404).json({ message: "No Instructors registered." });
    }

    res.status(200).json({ instructors });
  } catch (error) {
    console.error("Get Courses Error:", error);
    res.status(500).json({
      message: "Internal server error.",
      error: error.message,
    });
  }
};
