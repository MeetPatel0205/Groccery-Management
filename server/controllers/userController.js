import { User } from "../models/userModel.js";

import { MongoClient } from "mongodb";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

export const signupController = async (req, res) => {
  const { name, email, password, pic, registerDate } = req.body;

  console.log(pic);

  // Hashing a password using bcryptjs

  const salt = await bcrypt.genSalt(10);
  const securePassword = await bcrypt.hash(password, salt);

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({
      errMessage: "Email Already Exists",
    });
  } else {
    let newUser;

    if (pic == "") {
      newUser = await User.create({
        name,
        email,
        password: securePassword,
        pic: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        registerDate,
      });
    } else {
      newUser = await User.create({
        name,
        email,
        password: securePassword,
        pic,
        registerDate,
      });
    }

    const user = {
      id: newUser._id,
      email: newUser.email,
    };

    // console.log(newUser);

    // JWT Authentication

    const jsonwebtoken = jwt.sign(user, process.env.jwtsecertKey);

    res.status(201).json({
      message: "User Created Successfully",
      id: newUser._id,
      token: jsonwebtoken,
      name: newUser.name,
      email: newUser.email,
      pic: newUser.pic,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (!userExists) {
      res.status(400).json({
        errMessage: "Try To Logging With Diffrent Credentials",
      });
    } else {
      const comparepassword = await bcrypt.compare(
        password,
        userExists.password
      );

      if (!comparepassword) {
        res.status(400).json({
          errMessage: "Try To Logging With Diffrent Credentials",
        });
      } else {
        const user = {
          id: userExists._id,
          email: userExists.email,
        };

        const jsonwebtoken = jwt.sign(user, process.env.jwtsecertKey);

        res.status(200).json({
          message: "Login Success",
          token: jsonwebtoken,
          id: userExists._id,
          email: userExists.email,
          name: userExists.name,
          pic: userExists.pic,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const usershowController = async (req, res) => {
  try {
    const userData = await User.find();
    res.send({ success: true, data: userData });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res
      .status(500)
      .send({
        success: false,
        error: "An error occurred while fetching categories",
      });
  }
};

export const userchartController = async (req, res) => {
  try {
    const Categorydata = await User.find({});

    res.send({ success: true, data: Categorydata });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res
      .status(500)
      .send({
        success: false,
        error: "An error occurred while fetching categories",
      });
  }
};

export const adminlogincontroller = async (req, res) => {
  const client = new MongoClient(uri);

  try {
    const { email, password } = req.body;

    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("adminlogin");

    const userExists = await collection.findOne({ email });

    // console.log(typeof userExists.secretkey);
    // console.log(typeof password);


    if (!userExists) {
      return res.status(400).json({
        errMessage: "Try logging in with different credentials",
      });
    }

    if (password != userExists.secretkey) {
      return res.status(400).json({
        errMessage: "Try logging in with different credentials",
      });
    }

    const user = {
      id: userExists._id,
      email: userExists.email,
    };

    const jsonwebtoken = jwt.sign(user, process.env.jwtsecertKey);

    res.status(200).json({
      message: "Login Success",
      token: jsonwebtoken,
      id: userExists._id,
      email: userExists.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      errMessage: "Internal server error",
    });
  }
};
