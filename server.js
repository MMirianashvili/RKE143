const http = require("http");


const personInfo = {
    info: {
        name: "Mykhailo!",
        hobbies: ["Fishing", "Diving", "Bike rides"]
    },
    contact: {
        email: "t3sl4@mail.com"
    }
};

const { info: { name, hobbies }, contact: { email } } = personInfo;

const server = http.createServer((req, res) => {

    if (req.url === "/contact") {

        res.writeHead(200, { "Content-Type": "text/html" });

        // использование map из тестов
        const hobbyList = hobbies.map(hobby => `<li>${hobby}</li>`).join("");

        res.end(`
            <h1>Hello, my name is ${name}</h1>
            <p>You can reach me at ${email}</p>

            <h3>My hobbies:</h3>
            <ul>
                ${hobbyList}
            </ul>
        `);

    } else {

        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Home page");

    }

});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});