import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

// Middleware to verify JWT token from cookie
const authenicateUser = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("-password");
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, token failed");
  }
});

const authenticateGuest = asyncHandler(async (req, res, next) => {
  const guestToken = req.cookies.guestToken;

  if (!guestToken) {
    res.status(401);
    throw new Error("Guest token required");
  }

  try {
    const decoded = jwt.verify(guestToken, process.env.JWT_SECRET);
    req.user = { username: decoded.username, isGuest: true };
    next();
  } catch (error) {
    res.status(401);
    throw new Error("Invalid guest token");
  }
});

const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(401).json({ message: "Not authorized as Admin" });
  }
};

export { authenicateUser, authorizeAdmin, authenticateGuest };
