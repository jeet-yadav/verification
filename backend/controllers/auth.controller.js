import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js";

export const signup = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "no data received" });
  }

  // get data from body
  const { name, email, password } = req.body;

  try {
    // check if all fields are filled
    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }

    // check if user already exists
    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // gives a random 6 digit number
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    // save user in database
    await user.save();

    //create jwt token and set cookie
    generateTokenAndSetCookie(res, user._id);

    // email the verification code
    await sendVerificationEmail(user.email, verificationToken);

    // send response
    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  // if no data is received
  if (!req.body) {
    return res.status(400).json({ message: "no data received" });
  }

  const { email, password } = req.body;

  try {
    // check if all fields are filled
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // find the user by email
    const user = await User.findOne({ email });

    // check if user exists
    if (!user) {
      return res.status(400).json({ message: "unregistered email" });
    }

    // compare the user's password with db password
    const isPasswordValid = await bcryptjs.compare(password, user.password);

    // if password is not correct
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // create jwt token and set cookie
    generateTokenAndSetCookie(res, user._id);

    // update last login
    user.lastLogin = Date.now();
    await user.save();

    // send response
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token").status(200).json({
    message: "Logout successful",
    success: true,
  });
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;

  try {
    // get the user where the verification code matches, and is not expired yet.
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    // check if user exists with the respective code, or the code fails
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Verification failed" });
    }

    // update user
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    // send welcome email
    await sendWelcomeEmail(user.email, user.name);

    // send response
    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
