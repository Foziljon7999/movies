const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({ message: "Token not found" });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(403).json({ message: "the token is in the wrong format" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; 
    next(); 
  } catch (error) {
    res.status(403).send({
      success: false,
      message: error.message
    })
  }
};

const verifyRole = (role) => (req, res, next) => {
  if(req.user.role !== role) {
    return res.status(403).send("You are not allowed")
  }
  next()
}

module.exports = {
  verifyRole,
  verifyToken
}