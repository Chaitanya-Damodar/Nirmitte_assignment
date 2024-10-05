import User from "../model/userSchema.model.js"; // Ensure this path is correct
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  console.log({ id });

  return jwt.sign({ id }, "12121221", {
    expiresIn: "24h",
  });
};

export const register = async (req, res) => {
  const { username, email, password, userType } = req.body;
  console.log(username, email, password, userType);

  try {
    const user = await User.create({ username, email, password, userType });
    res.status(201).json({
      success: true,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password, userType } = req.body;

  try {
    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check if the userType matches
    if (user.userType !== userType) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized for this user type",
      });
    }

    // Validate the password
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Successful login
    res.json({
      success: true,
      token: generateToken(user._id),
      userType: user.userType,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
