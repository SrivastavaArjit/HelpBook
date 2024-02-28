import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { hashPassword, comparePassword } from "../helpers/auth.js";

// const nameParts = (fullname) => {
//   const nameParts = fullname.trim().split(" ");
//   const firstName = nameParts[0];
//   let lastName = nameParts.slice(1).join(" ");
//   if (!lastName) lastName = " ";

//   return { firstName, lastName };
// };

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, rememberme } = req.body;
    if (!username) {
      return res.json({ error: "Name is required!" });
    }
    if (!email) {
      return res.json({ error: "Email is required!" });
    }
    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and must be at least 6 characters!",
      });
    }
    const hashedPassword = await hashPassword(password);
    const findUser = await User.findOne({ email });
    if (!findUser) {
      const user = await User.create({
        name: username,
        email,
        hashedPassword,
        fbIntegration: false,
        rememberMe: rememberme,
      });

      return res.json(user);
    } else {
      return res.json({ error: "Email is already taken!" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });
    if (findUser) {
      const isPasswordMatch = await comparePassword(
        password,
        findUser.hashedPassword
      );
      if (isPasswordMatch) {
        jwt.sign(
          {
            name: findUser.name,
            email: findUser.email,
            id: findUser._id,
          },
          process.env.JSONKEY,
          { expiresIn: "10s" },
          (err, token) => {
            if (err) throw err;
            res
              .cookie("token", token, { httpOnly: true, maxAge: 10000 })
              .json(findUser);
          }
        );
      } else {
        return res.json({ error: "Incorrect password or email!" });
      }
    } else {
      return res.json({ error: "User not found!" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getProfile = (req, res) => {
  const { token } = req.cookies;
  console.log("token: ", token);
  if (token) {
    jwt.verify(
      token,
      process.env.JSONKEY,
      { expiresIn: "10s" },
      (err, user) => {
        if (err) {
          res.json({ error: "Invalid Token" });
        } else {
          res.json(user);
        }
      }
    );
  } else {
    res.json({ error: "Session Expired!" });
  }
};
