import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
import createUser from "../models/createAcc.js";


export const newUser = async (req, res) => {
  try {
    const { fullName, phoneNumber, email, password } = req.body;

    // Validate fields
    if (!fullName || !phoneNumber || !email || !password) {
      return res.status(400).json({ message: "Please input all fields" });
    }

    // Check if email already exists
    const alreadyExists = await createUser.findOne({ email });
    if (alreadyExists) {
      return res.status(400).json({ message: "Account already exists!" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = await createUser.create({
      fullName,
      phoneNumber,
      email,
      password: hashPassword,
    });

    // Create token
    const token = jwt.sign(
      {
        userId: newUser._id,
        email: newUser.email,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return res.status(201).json({
      message: "User created successfully",
      token,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};


export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find user
    const user = await createUser.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Sign JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        name: user.fullName,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return res.status(200).json({
      message: "Signin successful",
      token,
      data: {
        id: user._id,
        phone: user.phoneNumber,
        name: user.fullName,
        email: user.email,
      }
    });

  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};




