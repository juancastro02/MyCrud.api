const jwt = require("jsonwebtoken");

const generateToken = (res, email, id, admin) => {
  const token = jwt.sign({email}, process.env.JWT_SECRET);
  return res
    .status(200)
    .json({
      "id": id,
      "admin": admin,
      "email": email,
      "token": token
    });
};

module.exports = generateToken;