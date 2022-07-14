// In javascript, we have a class called "Promise". It represents the completion of an asynchronous operation.
const p = Promise.resolve({ id: 1 });    // this produces another promise, optionally we can provide object/value which is already obtained. Creates a new resolved promise for the provided value.


// Now get the result from the created promise.
p.then((result) => {
    console.log(result);
})

// ----------------------*----------------------*-----------------------------------*-------------------------------*--------------------------------------

// sometimes we get the error/rejection messages. Always provide "error object" in the reject method. If only error message is given, then we wont get back the "callstack" of the error.
const q = Promise.reject(new Error("reason for rejection"));    // Creates a new rejected promise for the provided reason.
q.catch((error) => {
    console.log(error);
})
