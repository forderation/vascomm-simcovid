const express = require("express");
const router = express.Router();
const {getSummaryCases, getSummaryCaseByCountryId} = require("../controllers/country-cases");
router.get("/summaries", getSummaryCases);
router.get("/summary/:cid", getSummaryCaseByCountryId);
module.exports = router;