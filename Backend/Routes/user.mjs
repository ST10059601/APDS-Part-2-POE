import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ExpressBrute from "express-brute";
import { checkWhitelist } from "../utils/validation.mjs";  // For input validation

const router = express.Router();

var store = new ExpressBrute.MemoryStore();
var bruteforce = new ExpressBrute(store, {
  freeRetries: 5, // Limit login attempts
  minWait: 1000 * 60, // 1 minute delay for each failed attempt
  maxWait: 1000 * 60 * 15 // 15 minutes max delay
});

const JWT_SECRET = "this_secret_should_be_longer_than_it_is";

// Sign up route
router.post("/register", async (req, res) => {
  const { name, password } = req.body;

  // Input validation using RegEx to prevent SQL Injection and XSS
  if (!checkWhitelist(name)) {
    return res.status(400).json({ message: "Invalid input" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    let newDocument = {
      name: name.trim(), // Sanitize input
      password: hashedPassword,
    };

    let collection = await db.collection("users");
    let result = await collection.insertOne(newDocument);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Signup failed" });
  }
});

// Login route with brute force protection
router.post("/login", bruteforce.prevent, async (req, res) => {
  const { name, password } = req.body;

  if (!checkWhitelist(name)) {
    return res.status(400).json({ message: "Invalid input" });
  }

  try {
    const collection = await db.collection("users");
    const user = await collection.findOne({ name: name.trim() });

    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Authentication failed" });
    } else {
      // Include user ID and username in the token
      const token = jwt.sign(
        { userId: user._id, username: name },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({
        message: "Authentication successful",
        token: token,
        name: name
      });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
});


export default router;
