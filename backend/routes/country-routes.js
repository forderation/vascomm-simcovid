const express = require("express");
const router = express.Router();
const {getCountries} = require("../controllers/country");

router.get("/countries", getCountries);

module.exports = router;