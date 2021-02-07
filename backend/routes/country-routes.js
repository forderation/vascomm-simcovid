const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/auth");
const {getCountries, getCasesByCountryId} = require("../controllers/countries");
router.use(checkAuth);
router.get("/countries", getCountries);
router.get("/cases/:cid", getCasesByCountryId);
module.exports = router;