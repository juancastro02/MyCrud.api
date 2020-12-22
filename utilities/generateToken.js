const jwt = require("jsonwebtoken");

const generateToken = (res, email) => {
  const token = jwt.sign({email}, process.env.JWT_SECRET);
  return res
    .cookie("token", token, {
      httpOnly: true,   
      secure: false,  
    })
    .status(200)
    .json({
      token
    });
};

module.exports = generateToken;