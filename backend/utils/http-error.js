
class HttpError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}
const throwError = (error) => {
    let err;
    if (error.response) {
        err = new HttpError(error.response.data.message, error.response.status);
    } else if (error.request) {
        err = new HttpError('Something error on service', 500);
    } else {
        err = new HttpError('Something error on server', 500);
    }
    return err;
}
module.exports = {HttpError, throwError};