const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { getAccessToken } = require("../services/getAccessToken");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json("All fields are required to be filled");
    }

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json("Email already exists");

    const hashed = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashed,
    });

    res.status(201).json("User registered successfully");
  } catch (err) {
    res.status(500).json(err.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== role) {
      return res.status(403).json({
        message: `Access denied. This account is registered as '${user.role}', not '${role}'.`,
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = getAccessToken(user);

    res.status(200).json({
      message: `${role} login successful`,
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
