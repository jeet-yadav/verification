import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

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
  res.send("login");
};

export const logout = async (req, res) => {
  res.send("logout");
};
