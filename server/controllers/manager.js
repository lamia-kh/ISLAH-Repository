const jwt = require(`jsonwebtoken`);
const bcrypt = require(`bcrypt`);
const generateTokenManager = require("../utils/generateTokenManager");
const { PrismaClient } = require(`@prisma/client`);
const { create } = require("yallist");
const prisma = new PrismaClient();

//check auth
function checkAuth(req, res, next) {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.key = decoded.Key;
    next();
  } catch (error) {
    res.status(401).send("Not authorized, please log in");
  }
}

//manager login
const login = async (req, res) => {
  try {
    const { key, password } = req.body;

    const manager = await prisma.manager.findUnique({
      where: {
        key,
      },
    });

    if (!manager) {
      return res.status(400).send(`Invalid key`);
    }

    //checking the manager password
    const isPasswordMatch = await bcrypt.compare(password, manager.password);
    if (!isPasswordMatch) {
      return res.status(401).send("كلمة مرور خاطئة");
    }

    //saving token in cookies and sending it back to client side
    const KeyToken = manager.key;
    const token = generateTokenManager(KeyToken);
    res.status(200).send({ message: "you've logged in successfully", token });
    //res.cookie("token", token)
  } catch (error) {
    console.error(error);
    res.status(500).send("حدث خطأ أثناء معالجة طلبك");
  }
};

//update manger password
const changePass = async (req, res) => {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, `jwt-secret-key`);

  const { old_pass, new_pass, re_new_pass } = req.body;

  const manager = await prisma.manager.findUnique({
    where: {
      key: decoded.Key,
    },
  });

  bcrypt.compare(old_pass, manager.password, async (err, result) => {
    if (err) return res.status(500).send(err);
    if (!result) return res.status(401).send(`wrong password, try again`);

    if (new_pass === re_new_pass) {
      await prisma.manager.update({
        where: {
          key: decoded.Key,
        },
        data: {
          password: bcrypt.hashSync(new_pass, 10),
        },
      });
      res.status(200).send(`password updated successfully`);
    }
  });
};

//validation
const validate = async (req, res) => {
  const validate = req.query.status;

  await prisma.raport.update({
    where: {
      report_id: parseInt(req.params.id),
    },
    data: {
      status: validate,
    },
  });
  res.status(200).send(`validated`);
};

//logout
const logout = (req, res) => {
  res.clearCookie("token");
  res.send("Logged out");
  res.redirect(`/`);
};

module.exports = { checkAuth, login, changePass, validate, logout };
