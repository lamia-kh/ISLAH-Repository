const express = require("express");
const cors = require(`cors`);
const cookieParser = require("cookie-parser");
const router = express.Router();
router.use(express.json());
router.use(cors());
router.use(cookieParser());
const {
  checkAuthentication,
  check_auth,
  register,
  login,
  logout,
  change_name,
  change_password,
  change_tel,
} = require("../controllers/user");

//route that will be used by our protected routes
router.get("/check", check_auth);

//user register
router.post(`/register`, register);
//user login
router.post(`/login`, login);

//user logout
// @desc Logout
// @route POST /api/auth/logout
// @access Privatew
router.get("/logout", checkAuthentication, logout);

//update user password
router.put(`/change-password`, checkAuthentication, change_password);

//update user name
router.put(`/change-name`, checkAuthentication, change_name);

//update user phone number
router.put(`/change-phone-number`, checkAuthentication, change_tel);

module.exports = router;
