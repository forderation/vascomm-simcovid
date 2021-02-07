const {HttpError} = require("../utils/http-error");
const firebase = require('firebase-admin');
const serviceAccount = require("./sim-covid-firebase.json");

async function verifyToken(token) {
    let user = null;
    if (!firebase.apps.length) {
        firebase.initializeApp({
            credential: firebase.credential.cert(serviceAccount)
        });
        firebase.auth().verifyIdToken(token).then((decoded) => {
            user = decoded;
        }).catch((err) => {
            console.log(err);
        });
    }
    return user;
}

module.exports = async (req, res, next) => {
    if (req.method === "OPTIONS") {
        // required adjustment to ensure that our options request is not blocked.
        return next();
    }
    try {
        if (!req.headers.hasOwnProperty("authorization")) {
            throw new HttpError("Not authenticated !", 401);
        }
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            throw new HttpError("Authentication failed !", 401);
        }
        const user = verifyToken(token);
        if (user == null) {
            throw new HttpError("Authentication failed, wrong token !", 401);
        }
        req.userData = {user: user};
        next();
    } catch (err) {
        return next(err);
    }
};