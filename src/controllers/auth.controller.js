import joi from "joi";
import { AppError } from "../ErrorHandler/errorClass.js";
import bcrypt from "bcrypt";
import db from "../database/db.js";
import jwt from "jsonwebtoken";

// get username,email,password

const signupSchema = joi.object({
  userName: joi.string().min(3).max(28).required(),
  email: joi.string().email().required().messages({
    "string.email": `Invalid email`,
  }),
  password: joi
    .string()
    .min(8)
    .max(28)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).+$/)
    .message(
      `Password must contain at least one uppercase, one lowercase, and one special character`,
    ),
  confirmPassword: joi.ref("password"),
});

const signup = async (req, res, next) => {
  try {
    let { error, value } = signupSchema.validate(req.body);
    if (error)
      return next(
        new AppError(`Validation failed,try Again`, 400, error.message),
      );
    let { userName, email, password } = value;
    let hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword)
      return next(new AppError(`bcrypt error`, 500, `Password hashing failed`));
    let insertUser = await db.query(
      `insert into users(username,email,hashed_password) values($1,$2,$3)`,
      [userName, email, hashedPassword],
    );
    if (insertUser.rowCount === 0)
      return next(new AppError(`signUp failed`, 500, `database error`));
    res.status(201).json({
      success: true,
      message: `user registered successfully!`,
      data: {
        user: userName,
      },
      timeStamp: new Date().toLocaleString(),
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
}


const loginSchema = joi.object({
  email: joi.string().email().required().messages({
    "string.email": `Invalid email`,
  }),
  password: joi
    .string()
    .min(8)
    .max(28)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).+$/)
    .message(
      `Password must contain at least one uppercase, one lowercase, and one special character`,
    ),
});

const login = async (req, res, next) => {
  try {
    let { error, value } = loginSchema.validate(req.body);
    if (error)
      return next(new AppError(`Invalid credentials`, 400, error.message));
    let { email, password } = value;
    let findUserDetails = await db.query(`select * from users where email=$1`, [
      email,
    ]);
    if (findUserDetails.rowCount === 0)
      return next(
        new AppError(`user not found`, 404, `signup before logging in!`),
      );
    let matchPassword = await bcrypt.compare(
      password,
      findUserDetails.rows[0].hashed_password,
    );
    if (!matchPassword)
      return next(
        new AppError(`Password not matched!`, 400, "Try with another password"),
      );
    let token = jwt.sign(
      { id: findUserDetails.rows[0].id, role: findUserDetails.rows[0].role },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "15m" },
    );
    let refreshToken = jwt.sign(
      { id: findUserDetails.rows[0].id },
      process.env.JWT_REFRESH_TOKEN,
      { expiresIn: "7d" },
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 86400000 * 7,
      sameSite: "strict",
    });
    res.status(200).json({
      success: true,
      message: `welcome back ${findUserDetails.rows[0].username}!`,
      token,
      timeStamp: new Date().toLocaleString(),
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export  {signup,login};
