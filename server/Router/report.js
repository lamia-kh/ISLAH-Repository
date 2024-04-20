const express = require(`express`);
const cors = require(`cors`);
const cookieParser = require("cookie-parser");

const checkAuthentication = require("../middleware/checkAuth");

const {
  submitReport,
  editReport,
  deleteReport,
} = require(`../controllers/report`);

const router = express.Router();
router.use(express.json());
router.use(cors());
router.use(cookieParser());

//submit report
router.post(`/submit-report`, checkAuthentication, submitReport);

//edit report
router.put("/edit-report/:id", checkAuthentication, editReport);

//delete report
router.delete(`/delete-report/:id`, checkAuthentication, deleteReport);

module.exports = router;
