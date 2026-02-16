
const User = require("../model/userschema.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendEmail = require('../utils/brevomail.js')
require("dotenv").config();

const registerUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    if(!username && !email && !password && !role){
      res.status(400).json({message:"missing field"})
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    if (role && !['user', 'admin', 'seller'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' })
    };

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role
    });

    await newUser.save();

    res.status(201).json({
      message: 'User registered successfully'
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatchPassword = await bcrypt.compare(password, user.password);

    if (!isMatchPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
      {
        id: user._id,
        name: user.username,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};



const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      role: user.role
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // send email (await!)
    await sendEmail(email, otp);

    // save otp in DB
    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;
    await user.save();

    res.status(200).json({ message: "OTP sent successfully" });

  } catch (error) {
    res.status(500).json({ message: "Failed to send OTP" });
  }
};
const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (!user.otp || !user.otpExpiry) {
    return res.status(400).json({ message: "OTP not requested" });
  }

  if (user.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  if (user.otpExpiry < Date.now()) {
    return res.status(400).json({ message: "OTP expired" });
  }

  user.otp = undefined;
  user.otpExpiry = undefined;
  await user.save();

  res.json({ message: "OTP verified successfully" });
};

const forgetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
const deleteUser = async (req, res) => {
  try {
    console.log("DELETE USER REQ.USER ", req.params);
    const { id, role } = req.user;      // from JWT
    const { userId } = req.params;      // target user

    // only admin allowed
    if (role !== "admin") {
      return res.status(403).json({
        message: "Only admin can delete users"
      });
    }

    // prevent admin from deleting self (optional but smart)
    if (id === userId) {
      return res.status(400).json({
        message: "Admin cannot delete own account"
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    await User.findByIdAndDelete(userId);

    res.status(200).json({
      message: "User deleted successfully"
    });

  } catch (error) {
    console.error("DELETE USER ERROR ", error);
    res.status(500).json({ message: "Server error" });
  }
};




const getAllUsers = async (req, res) => {
  try {
    const { role } = req.user; // from JWT

    // Only admin can get all users
    if (role !== "admin") {
      return res.status(403).json({ message: "Only admin can view users" });
    }

    const users = await User.find().select("-password"); // exclude password

    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerUser, loginUser, getProfile, sendOtp, verifyOtp, forgetPassword, deleteUser,getAllUsers };