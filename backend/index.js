const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const casesRoutes =require('./routes/cases-routes');
const countryRoutes =require('./routes/country-routes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((_, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    next();
});

app.use("/api/cases", casesRoutes);
app.use("/api/country", countryRoutes);
app.use((err, req, res, next) => {
    if (res.headerSent) {
        return next(err);
    }
    res.status(err.code || 500);
    res.json({ message: err.message || "An unknown error occurred" });
});
app.use((_, res, _3) => {
    return res.json({message: "Couldn't find this route", status: 404});
});
const port = process.env.PORT || 8088;
app.listen(port);
console.log(`server start at http://localhost:${port}`);