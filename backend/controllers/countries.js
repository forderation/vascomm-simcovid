const {throwError} = require("../utils/http-error");
const axios = require("../utils/base-axios");
const hDate = require('human-date');

const getCountries = async (req, res, next) => {
    let countries, startIndex, endIndex;
    const query = req.query;
    try {
        const response = await axios.get('/summary');
        countries = response.data.Countries;
    } catch (error) {
        return next(throwError(error));
    }
    countries.forEach(function (item) {
        item.HumanDate = hDate.prettyPrint(item.Date);
    })
    const lengthCountries = countries.length;
    if (query.hasOwnProperty("start") && query.hasOwnProperty("end")) {
        startIndex = parseInt(query.start, 10);
        endIndex = parseInt(query.end, 10);
        countries = countries.splice(startIndex, startIndex + endIndex);
    }
    res.json({
        countries: countries,
        length: lengthCountries
    });
}

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

module.exports = {getCountries, getCasesByCountryId};