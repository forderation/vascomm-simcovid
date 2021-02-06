const {HttpError} = require("../utils/http-error");
const {OAuth2Client, } = require('google-auth-library');
const PRIVATE_KEY = process.env.JWT_KEY;
const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
    if (req.method === "OPTIONS") {
        // required adjustment to ensure that our options request is not blocked.
        return next();
    }
    try {
        const clientId = process.env.CLIENT_ID
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            throw new HttpError("Authentication failed !", 401);
        }
        const client = new OAuth2Client(clientId);
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: clientId,
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        const decodedToken = jwt.verify(token, PRIVATE_KEY);
        req.userData = { userId: decodedToken.userId };
        next();
    } catch (err) {
        return next(err);
    }
};