const express = require(`express`);
const cookieParser = require("cookie-parser");

const router = express.Router();
router.use(express.json());
router.use(cookieParser());

const { community } = require(`../controllers/community`);
const checkAuthentication = require("../middleware/checkAuth");

//home community page
router.get("/", checkAuthentication, community);

module.exports = router;
