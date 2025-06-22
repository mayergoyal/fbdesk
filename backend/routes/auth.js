const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({ token, name: user.name, email: user.email });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
router.post("/page/connect", authMiddleware, async (req, res) => {
  const { pageId, pageName, pageAccessToken } = req.body;
  await Page.findOneAndUpdate(
    { userId: req.userId, pageId },
    { pageName, accessToken: pageAccessToken },
    { upsert: true }
  );
  res.json({ message: "Page connected" });
});
router.get("/inbox", authMiddleware, async (req, res) => {
  const page = await Page.findOne({ userId: req.userId });
  const convs = await axios.get(
    `https://graph.facebook.com/v19.0/${page.pageId}/conversations?access_token=${page.accessToken}`
  );
  res.json(convs.data.data);
});
router.get("/inbox/:convId", authMiddleware, async (req, res) => {
  const page = await Page.findOne({ userId: req.userId });
  const msgs = await axios.get(
    `https://graph.facebook.com/v19.0/${req.params.convId}/messages?fields=from,message,created_time&access_token=${page.accessToken}`
  );
  res.json(msgs.data.data);
});
  

module.exports = router;
