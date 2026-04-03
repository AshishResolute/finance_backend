import jwt from "jsonwebtoken";
import { AppError } from "../ErrorHandler/errorClass.js";


let authenticate = (req, res, next) => {
  try {
    let auth = req.get("authorization");
    if (!auth)
      return next(new AppError(`Unauthorised`, 401, `No Token Provided`));
    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return next(new AppError(`Unauthorised`, 401, `expired or invalid token`));
  }
};

export default authenticate;
