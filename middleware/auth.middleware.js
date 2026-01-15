import jwt from "jsonwebtoken";
import createUser from "../models/createAcc.js";

export const protect = async (req, res, next) => {
  try {
    console.log("AUTH MIDDLEWARE HIT");

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.log("NO AUTH HEADER");
      return res.status(401).json({ message: "Not authorized" });
    }

    const token = authHeader.split(" ")[1];
    console.log("TOKEN FOUND");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("DECODED:", decoded);

    const user = await createUser.findById(decoded.userId);
    console.log("USER FOUND:", user?._id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    console.log("AUTH PASSED");
    next();
  } catch (error) {
    console.error("AUTH ERROR:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

