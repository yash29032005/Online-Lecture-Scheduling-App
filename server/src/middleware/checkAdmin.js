exports.checkAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied, Admin only" });
    }

    next();
  } catch (err) {
    console.error("Admin Middleware Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
