const jwt = require(`jsonwebtoken`);
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

const { PrismaClient } = require(`@prisma/client`);
const prisma = new PrismaClient();

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
    req.user_id = decoded.user_id;

    // Proceed to next middleware
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    return res.status(401).json({ error: "Unauthorized" });
  }
};

const check_auth = async (req, res) => {
  // Extract token from cookies
  const token = req.cookies.token;

  // Check if token exists
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Replace 'your_secret_key' with your actual secret key
  // Add user ID to request object
  req.user_id = decoded.user_id;
  console.log(req.user_id);
  const user = await prisma.user.findUnique({
    where: { user_id: req.user_id },
  });
  //res.json(user);
  res.status(200).json({ isAuthenticated: true });
};

const register = async (req, res) => {
  const { name, password, phoneNumber } = req.body;

  // First, check if the phoneNumber already exists in the database
  const existingUser = await prisma.user.findUnique({
    where: {
      phoneNumber: phoneNumber,
    },
  });

  // If an existing user is found, send an error response
  if (existingUser) {
    return res
      .status(401)
      .send("رقم الهاتف موجود بالفعل. الرجاء استخدام رقم هاتف مختلف");
  }

  // If no user is found with the phoneNumber, proceed with hashing the password and creating the new user
  bcrypt.hash(password, 10, async (err, hashedPassword) => {
    if (err) {
      return res.status(400).send("Error not expected - hash failed");
    }

    try {
      const newUser = await prisma.user.create({
        data: {
          name: name,
          phoneNumber: phoneNumber,
          password: hashedPassword,
        },
      });
      return res.status(201).json("تم تسجيل المستخدم بنجاح");
    } catch (error) {
      // Handle potential errors, such as issues with the database operation
      console.error("Registration error:", error);
      return res.status(500).send("An error occurred during registration");
    }
  });
};

const login = async (req, res) => {
  try {
    const { phoneNumber, password, rememberMe } = req.body;
    const expiresIn = rememberMe ? "30d" : "1h"; // Example: 30 days if "Remember Me" is checked

    if (!phoneNumber || !password) {
      return res.status(400).send("مطلوب رقم الهاتف وكلمة المرور");
    }

    // Input validation can be more extensive based on your requirements
    const user = await prisma.user.findUnique({
      where: { phoneNumber },
    });

    if (!user) {
      return res.status(400).send("رقم الهاتف غير صحيح");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).send("كلمة مرور خاطئة");
    }

    const userId = user.user_id;
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
      expiresIn,
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Ensure cookies are sent over HTTPS
        sameSite: "strict", // Mitigate CSRF attacks
      })
      .status(200)
      .json({ message: "تم تسجيل الدخول بنجاح" });
  } catch (error) {
    console.error(error);

    res.status(500).send("حدث خطأ أثناء معالجة طلبك");
  }
};

const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ msg: "Logged out" });
  res.redirect(`/`);
};

const change_password = async (req, res) => {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const { old_pass, new_pass, re_new_pass } = req.body;

  const user = await prisma.user.findUnique({
    where: { user_id: decoded.userId },
  });

  bcrypt.compare(old_pass, user.password, async (err, result) => {
    if (err) return res.status(500).send(err);
    if (!result) return res.status(401).send(`wrong password, try again`);

    if (new_pass === re_new_pass) {
      await prisma.user.update({
        where: { user_id: decoded.userId },
        data: { password: bcrypt.hashSync(new_pass, 10) },
      });
      res.status(200).send(`password updated successfully`);
    }
  });
};

const change_name = async (req, res) => {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const { new_name } = req.body;

  await prisma.user.update({
    where: { user_id: decoded.userId },
    data: { name: new_name },
  });
  res.status(200).send(`name updated successfully`);
};

const change_tel = async (req, res) => {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const { new_phone_number } = req.body;

  await prisma.user.update({
    where: { user_id: decoded.userId },
    data: { name: new_phone_number },
  });
  res.status(200).send(`phone number updated successfully`);
};

module.exports = {
  checkAuthentication,
  check_auth,
  register,
  login,
  logout,
  change_name,
  change_password,
  change_tel,
};
