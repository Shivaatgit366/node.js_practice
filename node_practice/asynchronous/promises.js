// promise is an object which holds the result of the asynchronous operation.
// promise takes two function as arguments, they are resolve and reject.
// resolve means async operation fulfilled. Reject means async operation raised error.


const p = new Promise(function(resolve, reject) {
    // after the async work, we get value or error. The result will be sent to the consumers.
    // reject will contain error object in it      reject(new Error("error message")
    setTimeout(() => {
        // resolve(1000);
        reject(new Error("big error"));
    }, 4000);
});

// p.then((result) => console.log("Result is", result));
p.catch((err) => console.log("Error is", err.message));
