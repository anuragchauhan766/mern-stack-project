const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
// require("../db/connect");
const authenticate = require("../middleware/authenticate");
const User = require("../models/userSchema");
const nodemon = require("nodemon");

router.get("/", (req, res) => {
  res.send("hello world form router ");
});

router.post("/register", async (req, res) => {
  const { name, email, phone, profession, password } = req.body;

  if (!name || !email || !phone || !profession || !password) {
    res.status(422).json({ error: "Please fill the fields properly !!" });
  }
  try {
    const userExits = await User.findOne({ email: email });

    if (userExits) {
      return res.status(409).json({ error: "Email already exits" });
    }

    const user = new User({ name, email, phone, profession, password });
    const userRegistered = await user.save();
    if (userRegistered) {
      res.status(201).json({ message: "User succesfully registered" });
    } else {
      res.status(500).json({ error: "failed to register" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(422).json({ error: "Invalid creadential" });
  }
  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      res.status(400).json({ error: "Invalid creadential" });
    } else {
      const ismatch = await bcrypt.compare(password, user.password);
      if (ismatch) {
        const token = await user.generateAuthToken();

        res.cookie("jwttoken", token, {
          path: "/",
          expires: new Date(Date.now() + 2589200000),
          httpOnly: true,
          sameSite: "none",
          secure: true,
        });
        res.status(200).json({ message: "user signin successfully" });
      } else {
        res.status(400).json({ error: "Invalid creadential" });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/about", authenticate, (req, res) => {
  res.send(req.rootUser);
});

router.post("/contact", authenticate, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    if (!name || !email || !phone || !message) {
      return res.json({ error: "please filled the contact form" });
    }
    const userContact = await User.findOne({ _id: req.userId });
    if (userContact) {
      await userContact.addMessage(name, email, phone, message);

      // await userMessage.save();
      res.status(201).json({ message: "submit successfully" });
    }
  } catch (error) {
    console.log(error);
  }
});
router.get("/logout", (req, res) => {
  res.clearCookie("jwttoken", { path: "/" });
  res.status(200).json({ message: "Logout successfully" });
});
module.exports = router;
