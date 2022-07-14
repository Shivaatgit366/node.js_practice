// ###############################################################################################################################

const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:database");

// ###############################################################################################################################

const config = require("config");

// use package "joi" for input validation.
const Joi = require("joi");

const logger = require("./midlwre_funcs");
const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");

// we can make object using a function also. see below example.
const app = express();


// Question: how to set the production environment??
// Answer: export NODE_ENV=production


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

// enable below middleware "Morgan" only in the developer environment.
if (app.get("env") === "development") {
    app.use(morgan("tiny"));
    
// ###########################################################################################################################
    startupDebugger("Morgan Enabled . . .")
}

// for database work, imagine we had one print statement; it is replaced by debugger function.
dbDebugger("connected to the database . . .");
// ###########################################################################################################################

// array contains 3 objects.
const courses = [
    {id: 1, name: "course1"},
    {id: 2, name: "course2"},
    {id: 3, name: "course3"}
];


app.get("/", (req, res) => {
    res.send("Hello World!!");
});


app.get("/api/courses", (req, res) => {
    res.send(courses);
});


app.get("/api/courses/:id", (req, res) => {
    // every array in javascript has the method called "find".
    const result = courses.find((arg) => arg.id === parseInt(req.params.id));
    if (!result) {
        res.status(404).send("object with the given id not found");
    }
    res.send(result);
});


app.post("/api/courses/", (req, res) => {
    // write a schema/shape of the course object. Then, joi will take care of validation.
    // data validation check
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }


    // if (!req.body.name || req.body.name.length < 3) {
        // 400 Bad Request
        // res.status(400).send("Bad Request, name is required with min 3 characters")
        // return;
    // }


    const course = {id: courses.length + 1, name: req.body.name};
    // object is created but push the object into the array.
    courses.push(course);
    res.send(course);
});


app.put("/api/courses/:id", (req, res) => {
    //Look up the course, if not found then return 404
    // validate, if invalid then return 400 - bad request
    // if valid, then update and return the course.
    const course = courses.find((arg) => arg.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send("object with the given id not found");
    }

    // data validation check
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    // if valid, then update the data
    course.name = req.body.name;
    res.send(course);

});


app.delete("/api/courses/:id", (req, res) => {
    const course = courses.find((arg) => arg.id === parseInt(req.params.id));
    if (!course) {
        res.status(404).send("object with the given id not found");
    }

    // find out the index of the element, then delete it.
    const index = courses.indexOf(course);
    // use splices to remove the element from the array.
    courses.splice(index, 1);

    res.send(course);
});


// use colon to create the path parameter. Use the "req.params" to get the values of request parameter.
// use "req.query" to get the values of query parameter.
// app.get("/api/courses/:year/:date", (req, res) => {
    // res.send(req.params.year + req.params.date);
    // res.send(req.query);
// });


// javascript "process" object has environment variable.
// use keyword "set" in windows, "export" in mac to set the PORT value.
var port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`listening on the port ${port}...`);
});
