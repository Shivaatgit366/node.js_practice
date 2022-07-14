// the callback hell is resolved using "promises".
// callback functions are converted into promises.
// ------------------------------------------------*------------------------------*---------------------------------------------


console.log("Before");


// --------------------------*-------------------------------------*-----------------------------------------------------*--------------------------------*------------------------------------

// consuming the callback functions. It is called callback hell.
// getUser(1, (user) => {
//     getRepositories(user.gitHubUsername, (repos) => {
//         getCommits(repos[0], (commits) => {
//             console.log(commits);
//         })
//     })
// });
// --------------------------*-------------------------------------*-----------------------------------------------------*--------------------------------*------------------------------------


// --------------------------*-------------------------------------*-----------------------------------------------------*--------------------------------*------------------------------------
// above callback hell is resolved by promises. Below is the technique how to consume the promises.
// const p = getUser(2);    // returns the promise. we can store or directly use it.

// getUser(2)
//     .then((userObject) => getRepositories(userObject.gitHubUsername))
//     .then((repos) => getCommits(repos))
//     .then((commits) => console.log("Commit object is", commits))
//     .catch((err) => console.log("Error is", err.message));

// --------------------------*-------------------------------------*-----------------------------------------------------*--------------------------------*------------------------------------
// Async and Await approach looks similar to synchronous methods. Above example is used but it is written in async and await approach. In Async and await, we have try, catch blocks.
// anything which returns promise object can be written with "await". Use await keyword inside the function and async in the name of the function.
// it is used when writing the chain functions.
async function displayCommits() {
    try {
        const user = await getUser(1);
        const repos = await getRepositories(user.gitHubUsername);
        const commits = await getCommits(repos[0]);
        console.log(commits);
    }
    catch (err) {
        console.log("Error found", err.message);
    }
}

// call the function.
displayCommits();

// -----------------------------*-------------------------------------*------------------------------------------------------*---------------------------------*----------------------------------


console.log("After");




// callback function is below.
// function getUser(id, callback) {
//     setTimeout(() => {
//         console.log("Reading a user from a database...");
//         callback({ id: id, gitHubUsername: "shiva" });
//     }, 4000);
// }


// callback function converted into promises.
function getUser(id) {
    // put "return" for returning a promise object. 
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Reading a user from a database...");
            resolve({ id: id, gitHubUsername: "shiva" });
        }, 4000);
    });
}


// second callback function.
// function getRepositories(username, callback) {
//     setTimeout(() => {
//         console.log("calling github api . . .");
//         console.log("user is", username);
//         callback(["repo1", "repo2", "repo3"]);
//     }, 2000);
// }


// second callback function converted into promise.
function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("calling github api . . .");
            console.log("user is", username);
            // resolve(["repo1", "repo2", "repo3"]);
            reject(new Error("could not get the repos"));
        }, 4000);
    });
}


// third callback function.
// function getCommits(repo, callback) {
//     setTimeout(() => {
//         console.log("calling github api . . .");
//         console.log("repository", repo);
//         callback(["commit"]);
//     }, 4000)
// }


// third callback function converted into promise.
function getCommits(repo) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("calling github api . . .");
            console.log("repository", repo);
            resolve(["commit"]);
        }, 4000);
    });
}
