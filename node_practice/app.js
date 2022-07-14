const http = require("http");

const webServer = http.createServer((req, res) => {
    if (req.url === "/") {
        res.write("Hello World");
        res.end();
    }

    if (req.url === "/api/courses") {
        res.write(JSON.stringify([1, 2, 3]));
        res.end();
    }

    console.log("new connection...");
});

// using http module we can create new object with all the parent functions.

// write the event listener or event handler. event name is connection
// webServer.on("connection", (socket) => {
//     console.log("New Connection...");
// });

// when the webserver object listens to the event.
webServer.listen(3000);

console.log("webserver is listening on the port 3000...");
