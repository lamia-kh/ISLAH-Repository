const express = require(`express`);
const cors = require(`cors`);

const cookieParser = require("cookie-parser");

const router = express.Router();
router.use(express.json());
router.use(cors());
router.use(cookieParser());
const checkAuthentication = require("../middleware/checkAuth");
const {
  login,
  changePass,
  validate,
  logout,
} = require(`../controllers/manager`);

//manager login
router.post(`/login-manager`, login);

//update manger pssword
router.put(`/change-password`, checkAuthentication, changePass);

//validate
router.put(`/validate/:id`, checkAuthentication, validate);

//manager logout
// @desc Logout
// @route POST /api/auth/logout
// @access Private
router.get("/logout", checkAuthentication, logout);

module.exports = router;
