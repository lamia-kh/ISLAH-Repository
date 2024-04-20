const jwt = require(`jsonwebtoken`);

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.JWT_SECRET_KEY !== "development",
    sameSite: "Strict",
  });

  return token;
};

module.exports = generateToken;
