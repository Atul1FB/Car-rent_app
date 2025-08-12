// server/controllers/userControllers.js
import User from "../models/User.js";
import Car from "../models/car.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Utility to generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// REGISTER a new user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password || password.length < 8) {
      return res.json({
        success: false,
        message: "Fill all the fields correctly. Password must be at least 8 characters.",
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(newUser._id.toString());

    res.json({
      success: true,
      token,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: "Server error" });
  }
};

// LOGIN an existing user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = generateToken(existingUser._id.toString());

    res.json({
      success: true,
      token,
      user: {
        _id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.json({ success: false, message: "Server error" });
  }
};

// PROTECTED: Get user data
export const getUserData = async (req, res) => {
  try {
    console.log("➡️ getUserData req.user:", req.user);

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Your account cannot be authenticated",
      });
    }

    res.json({ success: true, user: req.user });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUBLIC: Get all available cars
export const getCars = async (req, res) => {
  try {
    const cars = await Car.find({ isAvailable: true });
    console.log("Found cars:", cars.length);
    res.json({ success: true, cars });
  } catch (error) {
    console.log("Error in getCars:", error.message);
    res.json({ success: false, message: error.message });
  }
};
