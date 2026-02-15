const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();


const users = [
  {
    id: 1,
    email: "student@nexus.com",
    password: "123456",
    role: "student"
  },
  {
    id: 2,
    email: "admin@nexus.com",
    password: "123456",
    role: "admin"
  }
];

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials"
    });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    "NEXUS_SECRET_KEY",
    { expiresIn: "1h" }
  );

  res.json({
    success: true,
    message: "Login successful",
    token,
    role: user.role
  });
});

router.get("/test", (req, res) => {
  res.json({
    message: "Auth route working perfectly ✅"
  });
});

module.exports = router;