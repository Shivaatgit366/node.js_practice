// use callback function. Put the callback signature over there.
// callback function calls/returns the asynchronous operation.
// that result should be used as a parameter/argument for calling the real function.


console.log("Before");

// result of the asynchronous function should be used as a parameter.
getUser(1, (user) => {
    // get the repositories
    getRepositories(user.id, (repos) => {
        console.log("Repos", repos);
    });
});

console.log("After");


// setTimeout is the in built function.
function getUser(id, callback) {
    setTimeout(() => {
        console.log("reading the data from the database . . .");
        callback({id: id, gitname: "shiva"});
    }, 3000);
}


// to make any function asynchronous, first put the signature "callback".
function getRepositories(userid, callback) {
    setTimeout(() => {
        console.log(userid);
        // when the async operation is ready, put the "callback" before that. 
        callback(["repo1", "repo2", "repo3"]);
    }, 8000);
}

