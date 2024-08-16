require("dotenv").config();
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

// create account for user

async function userRegister(req, res) {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName) {
      return res
        .status(400)
        .json({ msg: "Add first name to create an account." });
    }

    if (!email) {
      return res.status(400).json({ msg: "Add email to create an account." });
    }

    if (!password) {
      return res
        .status(400)
        .json({ msg: "Add password to create an account." });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new userModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    const token = jwt.sign(
      {
        id: newUser._id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        emailVerify: newUser.emailVerify,
        userType: newUser.userType,
      },
      process.env.USER_PASS
    );
    return res
      .status(201)
      .json({ msg: "Account has been created.", user: token });
  } catch (err) {
    if (err.code === 11000) {
      // MongoDB duplicate key error
      return res.status(400).json({ msg: "Email already exists." });
    }
    return res
      .status(500)
      .json({ msg: "Account can't be created.", error: err });
  }
}

module.exports = userRegister;

// login account
async function userLogIn(req, res) {
  try {
    let { email, password } = req.body;

    if (!email) {
      return res.json({ msg: "add email to login", errorStatus: true });
    }

    if (!password) {
      return res.json({ msg: "add password to login", errorStatus: true });
    }

    if (email && password) {
      let user = await userModel.findOne({ email });
      if (!user) {
        return res.json({ msg: "account not found!", errorStatus: true });
      }

      let result = await bcrypt.compare(password, user.password);

      if (!result) {
        return res.json({ msg: "account not found!", errorStatus: true });
      }
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          emailVerify: user.emailVerify,
          userType: user.userType,
        },
        process.env.USER_PASS
      );

      return res.json({ msg: `Welcome ${user.firstName} ${user.lastName}`, token, errorStatus: false });
    }
  } catch (err) {
    return res.json({ msg: "account not found!", error: err});
  }
}

//  email to verify email by link
async function emailVerify(req, res) {
  try {
    let { id } = req.params;

    if (!id) {
      return res.json({ msg: "can't verify account" });
    }

    let user = await userModel.findByIdAndUpdate(
      id,
      { emailVerify: true },
      { new: true }
    );
    if (!user) {
      return res.json({ msg: "can't verify account" });
    }

    return res.json({ msg: "account has been verified", user });
  } catch (err) {
    return res.json({ msg: "can't verify account", error: err });
  }
}

// send eamil to user to verify user
async function sendEmailVerify(req, res) {
  try {
    let { email, id } = await req.body;
    if (!email) {
      return res.json({ msg: "no email found for verification" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.ADMIN_EMAIL, // sender address
      to: email, // list of receivers
      subject: "Verify Your Email", // Subject line
      html: `
      <h1>T-Mart</h1>
<a href="http://localhost:5173/verify/${id}">Click Me To Verify</a>
      `, // html body
    });

    return res.json({ msg: "account verification email send", info });
  } catch (err) {
    return res.json({ msg: "unable to send verification email", error: err });
  }
}

// get user by id
async function getUserById(req, res) {
  try {
    let { id } = req.params;
    let user = await userModel.findById(id);
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        emailVerify: user.emailVerify,
        userType: user.userType,
      },
      process.env.USER_PASS
    );
    res.json({ user:token });
  } catch (err) {
    console.log(err)
    res.json({ err });
  }
}

module.exports = {
  userRegister,
  userLogIn,
  emailVerify,
  sendEmailVerify,
  getUserById,
};
