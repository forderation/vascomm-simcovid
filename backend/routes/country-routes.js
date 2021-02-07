const express = require("express");
const router = express.Router();
const {getCountries, getCasesByCountryId} = require("../controllers/countries");
router.get("/countries", getCountries);
router.get("/cases/:cid", getCasesByCountryId);
module.exports = router;