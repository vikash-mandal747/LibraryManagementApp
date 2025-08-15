const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRETKEY = process.env.JWT_SECRETKEY;
const UserModel = require("../model/user.model");

const cookieName = "access_token";

async function requireAuth(req, res, next) {
  try {
    const token = req.cookies?.[cookieName]; 
    if (!token) {
      return res.status(401).json({ msg: "Not authenticated" });
    }
    const decoded = jwt.verify(token, JWT_SECRETKEY); 
    const user = await UserModel.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    req.user = user; // Attach user object to request
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid or expired token" });
  }
}

module.exports = { requireAuth, cookieName };
