import jwt from "jsonwebtoken";

const generateToken = (id, email) => {
  return jwt.sign({ id, email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};

export { generateToken, verifyToken };
