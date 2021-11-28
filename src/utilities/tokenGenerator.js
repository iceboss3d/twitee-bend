import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
const secretKey = process.env.JWT_SECRET;
const exp = process.env.JWT_EXP

export const generateToken = (payload) => {
  const token = jwt.sign(payload, secretKey);
  return token;
};

export const verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, secretKey);
    return payload;
  } catch (error) {
    return false;
  }
};
