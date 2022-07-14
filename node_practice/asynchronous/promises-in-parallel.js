// sometimes we have to use 2 or more asynchronous operations running parallelly;

// let us consider this is related to calling facebook api.
const p1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("Async operation 1 . . .");
        resolve(1);
        // reject(new Error("because something is failed..."));
    }, 4000);
});


// consider this is related to calling youtube api.
const p2 = new Promise((resolve) => {
    setTimeout(() => {
        console.log("Async operation 2 . . .");
        resolve(2);
    }, 4000);
});


// "Promise" class represents the completion of an asynchronous operation. This class has a function ".all()" 
// .all() Creates a Promise when all the promises in the array get resolved.
// .all() Creates a Promise that is resolved with an array of results when all of the provided Promises resolve, or rejected when any Promise is rejected.
Promise.all([p1, p2])
    .then((result) => console.log("Hello the result is", result))
    .catch((error) => console.log("Error is", error.message));


// Use "race()" method in case if we want to stop the process just after the first promise.
Promise.race([p1, p2])
    .then((result) => console.log(result))
    .catch((error) => console.log("Error is", error.message));

