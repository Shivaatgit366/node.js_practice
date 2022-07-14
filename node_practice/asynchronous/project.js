// import courses module, we get "courses router" object.
const courses = require("./routes/courses")

const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:database");

const config = require("config");

// use package "joi" for input validation.
const Joi = require("joi");

const logger = require("./middlewares/midlwre_funcs");
const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");

// we can make object using a function also. see below example.
const app = express();

// to find out production environment or developer environment, use below code.
console.log(`app: ${app.get("env")}`);

// middlewares should be used only in need. Otherwise middlewares will slow down the request process.
// express has many built in middlewares. "json" middleware helps to parse the response data into json.
app.use(express.json());


// "urlencoded" middleware gives the urlencoded form for the post request.
app.use(express.urlencoded({ extended: true }));


// "static" middleware helps to use images, static files in the http requests.
// we can read our local text file at    http://localhost:3000/readme.txt
app.use(express.static("public"));


// to use middleware functions, just take "use" property. A custom middleware "logger" we created, it is being used.
app.use(logger);


// 3rd party middlewares.
app.use(helmet());


// all apis related to below endpoint will be taken care by courses router.
app.use("/api/courses", courses);


// enable below middleware "Morgan" only in the developer environment.
if (app.get("env") === "development") {
    app.use(morgan("tiny"));
    startupDebugger("Morgan Enabled . . .")
}

// for database work, imagine we had one print statement; it is replaced by debugger function.
dbDebugger("connected to the database . . .");


var port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`listening on the port ${port}...`);
});
