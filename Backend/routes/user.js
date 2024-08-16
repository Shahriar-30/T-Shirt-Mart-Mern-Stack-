const express = require("express");
const { userRegister, userLogIn, emailVerify, sendEmailVerify, getUserById } = require("../controllers/user");

let userRouter = express.Router();

userRouter.route("/register").post(userRegister);
userRouter.route("/login").post(userLogIn);

userRouter.route("/account/verify/:id").patch(emailVerify);
userRouter.route("/account/verify/email/send").post(sendEmailVerify);

userRouter.route("/userbyid/:id").get(getUserById);


module.exports = userRouter;
