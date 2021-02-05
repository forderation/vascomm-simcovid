const {throwError} = require("../utils/http-error");
const axios = require("../utils/base-axios");

const getCountries = async (req, res, next) => {
    let countries;
    try {
        const response = await axios.get('/countries');
        countries = response.data;
    } catch (error) {
        return next(throwError(error));
    }
    res.json(countries);
}

module.exports = {getCountries};