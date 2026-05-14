async function getRandomRecipe() {

    const response = await fetch("https://rke143-9tz6.onrender.com/random");

    const recipe = await response.json();

    console.log(recipe);

    document.getElementById("recipeContainer").innerHTML = `
        <h2>${recipe.name}</h2>

        <img src="${recipe.imageURL}" width="300">

        <h3>Ingredients:</h3>

        <ul>
            ${recipe.ingredients.map(item => `<li>${item}</li>`).join("")}
        </ul>
    `;
}

getRandomRecipe();

document.getElementById("newRecipeBtn").addEventListener("click", () => {
    getRandomRecipe();
});