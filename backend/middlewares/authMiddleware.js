import ApiError from "../utils/ApiError.js";
import { verifyToken } from "../utils/jwtToken.js";

const authMiddleware = async (req, _, next) => {
  const token = req.headers.token;

  if (!token) {
    throw new ApiError(401, "Unauthorised! Please login");
  }
  try {
    const decoded_token = verifyToken(token);
    req.body.userId = decoded_token.id;
    next();
  } catch (error) {
    console.error(error);
    throw new ApiError(500, error.message);
  }
};

export default authMiddleware;
