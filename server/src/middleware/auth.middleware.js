import jwt from "jsonwebtoken";
import { ApiError } from "../utils/api-errors.js";

const verifyJWT = (req, res, next) => {
  try {
    const token = req.headers["access-token"];

    if (!token) {
      return next(new ApiError(403, "Unauthorized access"));
    }

    let decodedToken;

    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRETKEY);
    } catch (err) {
      return next(new ApiError(401, "Invalid or expired access token"));
    }

    req.address = decodedToken.address;
    next();
  } catch (error) {
    next(new ApiError(500, "Server error"));
  }
};

export { verifyJWT };
