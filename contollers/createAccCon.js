import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
import createUser from "../models/createAcc.js";

export const newUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Validate fields
    if (!fullName || !email || !password) {
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

    // Create new user (NO SESSION)
    const createNewUser = await createUser.create({
      fullName,
      email,
      password: hashPassword,
    });

    // Create JWT token
    const token = jwt.sign(
      {
        userId: createNewUser._id,
        email: createNewUser.email,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    // Send response
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



export const signIn = async(req, res, next) =>{
    const session = await mongoose.startSession();
    session.startTransaction();
}



