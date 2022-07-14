// load the mongoose module.
const mongoose = require("mongoose");


// database connection.
mongoose.connect("mongodb://localhost:27017/mongo-exercises")
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.error("Could not connect to the server MongoDB...", error));


// setting the schema.
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number
});


// write the model/class.
const Course = mongoose.model("Course", courseSchema);


// No need to create the objects/documents. They are already created.
// We can use it to do the queries on the documents/objects.

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Question:- Get all the published backend courses, sort them by name, pick only their name and author, display them.
async function getCourses() {
    return await Course
    .find({ isPublished: true, tags: "backend" })
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });
}

async function run() {
    const courses = await getCourses();
    console.log(courses);
}

run();

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------

