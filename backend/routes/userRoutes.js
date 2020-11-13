const express = require("express");
const router = express.Router();
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const { auth } = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const { admin } = require("../middleware/auth");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const compare = user && (await bcrypt.compare(password, user.password));
  if (user && compare) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
        expiresIn: "30d",
      }),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const userexist = await User.findOne({ email });
  if (userexist) {
    res.status(400).json({ message: "User already exists" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashpassword = await bcrypt.hash(password, salt);
  const user = await new User({ name, email, password: hashpassword });
  user.save((err, doc) => {
    if (err) {
      return res.status(400).json({ message: "Invalid User Data" });
    } else {
      console.log(doc);
      return res.status(201).json({
        _id: doc._id,
        name: doc.name,
        email: doc.email,
        isAdmin: doc.isAdmin,
        token: jwt.sign({ id: doc._id }, process.env.TOKEN_SECRET, {
          expiresIn: "30d",
        }),
      });
    }
  });
});

router.get("/profile", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

router.put("/profile", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashpassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashpassword;
    }
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: jwt.sign({ id: updatedUser._id }, process.env.TOKEN_SECRET, {
        expiresIn: "30d",
      }),
    });
  } else {
    return res.status(404).json({ message: "User not found" });
  }
});

//ADMIN GET USERS
router.get("/", auth, admin, async (req, res) => {
  const users = await User.find({});
  res.json(users);
});
//ADMIN DELETE USERS
router.delete("/:id", auth, admin, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "User Removed" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});
// ADMIN GET A USER INFO
router.get("/:id", auth, admin, async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

//ADMIN CHANGE THAT INFO

router.put("/:id", auth, admin, async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    return res.status(404).json({ message: "User not found" });
  }
});
module.exports = router;
