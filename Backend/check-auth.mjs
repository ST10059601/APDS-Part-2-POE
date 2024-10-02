import jwt from "jsonwebtoken";

// Hardcoded JWT secret
const JWT_SECRET = "this_secret_should_be_longer_than_it_is";

const checkauth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);  // Verifying the token

    req.userData = {
      userId: decoded.userId,  // Assuming the user ID is stored in the token
      username: decoded.username
    };

    next();
  } catch (error) {
    res.status(401).json({
      message: "Token invalid"
    });
  }
};

export default checkauth;
