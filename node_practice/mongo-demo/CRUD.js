// load the mongoose module.
const mongoose = require("mongoose");


// connect mongodb server which is installed in this device. Mention the database name. Automatically database will be created.
// this connect method returns a promise. When the database is connected, we want to return a print statement.
mongoose.connect("mongodb://localhost:27017/playground")
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.error("Could not connect to the server MongoDB...", error));


// schema defines the "shape of collection" in mongoDB database. Schema types are string, number, date, buffer, boolean, objectID, array.
// collection is same as the "table" in sql.
const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ "string" ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});


// create the class and then make the object from it. Remember class means a table/model/collection. Then save the object into the collection/table as a row.
// class starts with uppercase, where as object is written in lowercase.
const Course = mongoose.model("Course", courseSchema);


// object is created using the class. Object will be saved into the database. 
// Since this saving process takes time, it is made asynchronous operation in javascript.
// this saving method returns a promise.
async function createCourse() {
    const course = new Course({
        name: "Angular Course",
        author: "Vignesh",
        tags: ["Angular", "frontend"],
        isPublished: true
    });

    const result = await course.save();
    console.log(result);
}

// call the function.
// createCourse();


// ------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------

// how to retrieve data from the mongoDB database?
// the class/table/collection has bunch of methods for query.


// find method returns a promise.
// async function getCourses() {
    // const courses = await Course.find();
    // console.log(courses);
// }

// getCourses();

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------

// filtering using find method.
// In sort method, we can use 1 for ascending and -1 for descending.
// async function getCourses() {
    // const courses = await Course
    //     .find({author: "Shiva", isPublished: true})
    //     .limit(10)
    //     .sort({ name: 1 })
    //     .select({ name: 1, tags: 1 });
    // console.log(courses);
// }

// getCourses();

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------

// comparison query using find method. Operators like $lte, $gte, $in, $ne are used inside the the dictionary for comparison. So, use comparison operators like an object.
// async function getCourses() {
//     const courses = await Course
//         .find({ price: { $gte: 10, $lte: 20, $in: [13, 15, 16]}})
//         .limit(10)
//         .sort({ name: 1 })
//         .select({ name: 1, tags: 1 });
//     console.log(courses);
// }

// getCourses();

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Logical query operators like "or" and "and" can be used for query. We should use "array"/list for providing multiple values.

// async function getCourses() {
//     const courses = await Course
//         .find({ price: { $gte: 10, $lte: 20, $in: [13, 15, 16]}})
//         .or([{ author: "Mosh" }, { isPublished: true }])
//         .and([{ author: "Mosh" }, { isPublished: true }])
//         .limit(10)
//         .sort({ name: 1 })
//         .select({ name: 1, tags: 1 });
//     console.log(courses);
// }

// getCourses();

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Regular expressions pattern is    /pattern/
// use ^ for words starting with. Use $ for words ending with. Use /pattern/i  for case insensitive. Use /.*name.*/ for words which can be present anywhere.

async function getCourses() {
    const courses = await Course
        .find({ author: /^Mosh/ })
        .find({ bookname: /shiva%/i })
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });
    console.log(courses);
}

getCourses();

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------

// .count() method is used to count the number of objects.

// skip((pageNumber -1) * pageSize) and limit(pageSize)       this can be used to get documents in a given page.

// -------------------------------------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Updating the documents/objects/rows in mongoDB:-

// Updating can be done by 1) direct update method 
//                         2) get the object, then update(query first method).

// 