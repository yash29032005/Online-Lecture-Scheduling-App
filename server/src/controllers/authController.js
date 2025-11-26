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
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json("All fields are required to be filled");
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json("User not found");

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json("Invalid password");

    const token = getAccessToken(user);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};
