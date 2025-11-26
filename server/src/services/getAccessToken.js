const jwt = require("jsonwebtoken");

exports.getAccessToken = (user) => {
  return jwt.sign(
    { id: user._id, name: user.name, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};
