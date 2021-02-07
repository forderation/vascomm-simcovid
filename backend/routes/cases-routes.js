const express = require("express");
const checkAuth = require("../middlewares/auth");
const router = express.Router();
const {getSummaryCases, getSummaryCaseByCountryId} = require("../controllers/country-cases");
router.use(checkAuth);
router.get("/summaries", getSummaryCases);
router.get("/summary/:cid", getSummaryCaseByCountryId);
module.exports = router;