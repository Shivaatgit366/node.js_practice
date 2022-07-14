// custom middleware applied on all the routes/endpoints.

function log(req, res, next) {
    console.log("logging . . .");
    // to pass the control to the next middleware function. This is very important step.
    next();
}

// export as function only.
module.exports = log;
