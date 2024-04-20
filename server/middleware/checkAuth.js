const { PrismaClient } = require(`@prisma/client`);
const prisma = new PrismaClient();
const jwt = require(`jsonwebtoken`);

const checkAuthentication = async (req, res, next) => {
  try {
    // Extract token from cookies
    const token = req.cookies.token;

    // Check if token exists
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Replace 'your_secret_key' with your actual secret key

    // Add user ID to request object
    req.user_id = decoded;

    const user = await prisma.user.findUnique({
      where: { user_id: req.user_id },
    });

    // Proceed to next middleware
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    return res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = checkAuthentication;
