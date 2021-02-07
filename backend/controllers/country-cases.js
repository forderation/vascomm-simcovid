const { throwError, HttpError } = require("../utils/http-error");
const axios = require("../utils/base-axios");
const hDate = require('human-date');

const getSummaryCases = async (req, res, next) => {
    let globalResp;
    try {
        const response = await axios.get('/summary');
        globalResp = response.data.Global;
    } catch (error) {
        return next(throwError(error));
    }
    globalResp.HumanDate = hDate.prettyPrint(globalResp.Date);
    res.json({
        global: globalResp,
    });
}

const getSummaryCaseByCountryId = async (req, res, next) => {
    let countries;
    const cid = req.params.cid;
    try {
        const response = await axios.get('/summary');
        countries = response.data.Countries;
    } catch (error) {
        return next(throwError(error));
    }
    let country = countries.filter((item) => {
        return item.CountryCode === cid.toUpperCase();
    })
    if (country.length === 0) {
        return next(new HttpError('Cannot find country code', 404));
    } else {
        country = country[0];
        country.HumanDate = hDate.prettyPrint(country.Date);
    }
    res.json({
        country: country
    });
}

module.exports = { getSummaryCases, getSummaryCaseByCountryId }