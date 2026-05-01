const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {

  try {

    let token = req.headers.authorization;

    if (!token) {

      return res.status(401).json({
        message: "No token"
      });

    }

    token = token.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // IMPORTANT FIX
    req.user = {
      id: decoded.id,
      role: decoded.role
    };

    next();

  } catch (error) {

    console.log("Auth Error:",
      error.message);

    res.status(401).json({
      message: "Invalid token"
    });

  }

};

module.exports = protect;