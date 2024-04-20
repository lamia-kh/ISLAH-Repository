const jwt = require(`jsonwebtoken`);

const generateTokenManager = (key) => {
  const token = jwt.sign({ key }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });

  return token;
};

module.exports = generateTokenManager;
