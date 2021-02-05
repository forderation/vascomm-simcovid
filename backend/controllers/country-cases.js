const {throwError, HttpError} = require("../utils/http-error");
const axios = require("../utils/base-axios");
const hDate = require('human-date');

const getCasesByCountryId = async (req, res, next) => {
    const countryId = req.params.cid;
    let casesResp;
    try {
        const response = await axios.get('/dayone/country/' + countryId);
        casesResp = response.data;
    } catch (error) {
        return next(throwError(error));
    }
    casesResp.forEach(function (item) {
        item.HumanDate = hDate.prettyPrint(item.Date);
    })
    res.json(casesResp);
}

const getSummaryCases = async (req, res, next) => {
    let globalResp, countries;
    try {
        const response = await axios.get('/summary');
        globalResp = response.data.Global;
        countries = response.data.Countries;
    } catch (error) {
        return next(throwError(error));
    }
    globalResp.HumanDate = hDate.prettyPrint(globalResp.Date);
    countries.forEach(function (item) {
        item.HumanDate = hDate.prettyPrint(item.Date);
    })
    res.json({
        global : globalResp,
        countries : countries
    });
}

const getSummaryCaseByCountryId = async(req, res, next) => {
    let countries;
    const cid = req.params.cid;
    try {
        const response = await axios.get('/summary');
        countries = response.data.Countries;
    } catch (error) {
        return next(throwError(error));
    }
    const country = countries.filter((item) => {
       return item.CountryCode === cid.toUpperCase();
    })
    if(country.length === 0){
        return next(new HttpError('Cannot find country code', 404));
    }
    res.json({
        country : country
    });
}

module.exports = {getCasesByCountryId, getSummaryCases, getSummaryCaseByCountryId}