import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
  // generating a jwt token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // setting the token as a cookie
  res.cookie("token", token, {
    httpOnly: true, // prevents client-side JS from accessing the cookie
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", // prevents cross-site request forgery
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};
