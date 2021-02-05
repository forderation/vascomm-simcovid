const express = require("express");
const router = express.Router();
const {getCasesByCountryId, getSummaryCases, getSummaryCaseByCountryId} = require("../controllers/country-cases");

router.get("/summaries", getSummaryCases);
router.get("/summary/:cid", getSummaryCaseByCountryId);
router.get("/country/:cid", getCasesByCountryId);

module.exports = router;