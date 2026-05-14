const recipeCard = document.getElementById("recipe-card");
const button = document.getElementById("new-recipe-btn");

async function getRecipe() {

    const response = await fetch(
       const API_URL = "https://rke143-9tz6.onrender.com/random";
    );

    const recipe = await response.json();

    recipeCard.innerHTML = `
        <h2>${recipe.name}</h2>

        <img src="${recipe.imageURL}" alt="${recipe.name}">

        <h3>Ingredients:</h3>

        <ul>
            ${recipe.ingredients
                .map(item => `<li>${item}</li>`)
                .join("")}
        </ul>
    `;
}

button.addEventListener("click", getRecipe);

getRecipe();