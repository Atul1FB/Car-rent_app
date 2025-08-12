//  protect.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("'No Authorization Header");
      return res.status(401).json({
        success: false,
        message: "Authorization token missing",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(" Token verified:", decoded);
    console.log(" Searching user with ID:", decoded.id);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      console.log(" User not found in DB for ID:", decoded.id);

      const allUsers = await User.find({});
      console.log(" All users in DB:");
      allUsers.forEach(u => console.log(` ${u._id} | ${u.email} | ${u.role}`));

      return res.status(401).json({
        success: false,
        message: "Your account cannot be authenticated.",
      });
    }

    console.log(" User found:", user.email);
    req.user = user;
    next();
  } catch (err) {
    console.error(" Error in protect middleware:", err.message);
    return res.status(401).json({
      success: false,
      message:
        err.name === "TokenExpiredError"
          ? "Your session has expired. Please log in again."
          : "Invalid or expired token",
    });
  }
};
