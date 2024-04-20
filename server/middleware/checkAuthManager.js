const { PrismaClient } = require(`@prisma/client`);
const prisma = new PrismaClient();
const jwt = require(`jsonwebtoken`);

const checkAuthManager = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(403).send("Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { key } = decoded; // Storing the decoded JWT token in request for future use
    const manager = await prisma.manager.findUnique({
      where: { key: key },
    });
    next();
  } catch (error) {
    res.status(401).send("Invalid token. Not authorized.");
  }
};
module.exports = checkAuthManager;
