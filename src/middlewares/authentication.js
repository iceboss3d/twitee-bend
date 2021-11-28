import { response } from "../helpers/response.js";
import { verifyToken } from "../utilities/tokenGenerator.js";

const verifyAuthHeader = (req) => {
  const token = req.headers.authorization;
  if (!token) return false;
  const payload = verifyToken(token.substring(7));
  if (!payload) return false;
  return payload;
};

export const verifyUser = (req, res, next) => {
  const payload = verifyAuthHeader(req);
  if (!payload) {
    console.log("here");
    return response.error(res, "Unauthenticated", 403);
  }
  req.user = payload;
  next();
};