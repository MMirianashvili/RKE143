const http = require("http");
const fs = require("fs");

const PORT = process.env.PORT || 3000;

const personInfo = {
    info: {
        name: "Mykhailo!",
        hobbies: ["Fishing", "Diving", "Bike riding"]
    },
    contact: {
        email: "t3sl4@email.com"
    }
};

const countries = [
{ id: 1, name: "Austria", capital: "Vienna", currency: "Euro" },
  { id: 2, name: "Belgium", capital: "Brussels", currency: "Euro" },
  { id: 3, name: "Bulgaria", capital: "Sofia", currency: "Bulgarian Lev" },
  { id: 4, name: "Croatia", capital: "Zagreb", currency: "Croatian Kuna" },
  { id: 5, name: "Cyprus", capital: "Nicosia", currency: "Euro" },
  { id: 6, name: "Czech Republic", capital: "Prague", currency: "Czech Koruna" },
  { id: 7, name: "Denmark", capital: "Copenhagen", currency: "Danish Krone" },
  { id: 8, name: "Estonia", capital: "Tallinn", currency: "Euro" }
];

function readJsonFile(fileName) {
    const fileData = fs.readFileSync(fileName, "utf-8");
    return JSON.parse(fileData);
}

function writeJsonFile(fileName, data) {
    fs.writeFileSync(fileName, JSON.stringify(data, null, 2));
}

function getRandomRecipe(recipes) {
    return recipes[Math.floor(Math.random() * recipes.length)];
}

const server = http.createServer((req, res) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    const url = req.url;
    const method = req.method;

    console.log(`${method} ${url}`);

    if (url === "/contact" && method === "GET") {
        const { info, contact } = personInfo;

        const hobbyList = info.hobbies
            .map(hobby => `<li>${hobby}</li>`)
            .join("");

        res.writeHead(200, { "Content-Type": "text/html" });

        return res.end(`
            <h1>Hello, my name is ${info.name}</h1>
            <p>You can reach me at ${contact.email}</p>

            <h3>My hobbies:</h3>
            <ul>
                ${hobbyList}
            </ul>
        `);
    }

    if (url === "/countries" && method === "GET") {
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(countries));
    }

    if (url.startsWith("/countries/") && method === "GET") {
        const parts = url.split("/");
        const countryId = Number(parts[2]);

        const foundCountry = countries.find(
            country => country.id === countryId
        );

        res.writeHead(200, { "Content-Type": "application/json" });

        if (foundCountry) {
            return res.end(JSON.stringify(foundCountry));
        }

        return res.end(
            JSON.stringify({ message: "Country not found" })
        );
    }


else if (url === "/rke143" && method === "POST") {
    let body = "";

    req.on("data", chunk => {
        body += chunk.toString();
    });

    req.on("end", () => {
        const data = JSON.parse(body);

        if (data.nimi === "rke" && data.kood === "143") {
            const fileData = fs.readFileSync("nodejs.json", "utf-8");

            res.writeHead(200, {
                "Content-Type": "application/json"
            });

            return res.end(fileData);

        } else {
            res.writeHead(200, {
                "Content-Type": "application/json"
            });

            return res.end(JSON.stringify({
                message: "invalid credentials"
            }));
        }
    });

    return;
}

else if (url === "/random" && method === "GET") {
        const recipes = readJsonFile("recipes.json");
        const randomRecipe = getRandomRecipe(recipes);

        res.writeHead(200, { "Content-Type": "application/json" });

        return res.end(JSON.stringify(randomRecipe));
    }

    if (url === "/fullRecipes" && method === "GET") {
        const recipes = readJsonFile("recipes.json");

        res.writeHead(200, { "Content-Type": "application/json" });

        return res.end(JSON.stringify(recipes));
    }

    if (url === "/add" && method === "POST") {
        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {
            const newRecipe = JSON.parse(body);
            const recipes = readJsonFile("recipes.json");

            recipes.push(newRecipe);

            writeJsonFile("recipes.json", recipes);

            res.writeHead(200, {
                "Content-Type": "application/json"
            });

            return res.end(
                JSON.stringify({
                    message: "Recipe added successfully"
                })
            );
        });

        return;
    }

    if (url.startsWith("/delete/") && method === "DELETE") {
        const recipeId = Number(url.split("/")[2]);

        const recipes = readJsonFile("recipes.json");

        const updatedRecipes = recipes.filter(
            recipe => recipe.id !== recipeId
        );

        writeJsonFile("recipes.json", updatedRecipes);

        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        return res.end(
            JSON.stringify({
                message: "Recipe deleted successfully"
            })
        );
    }

    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Home page");
});

server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});