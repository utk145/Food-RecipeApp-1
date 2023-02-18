const searchForm = document.querySelector("form");
const searchResult = document.querySelector(".search-result");
const container = document.querySelector(".container");
let searchQuery = "";
const api_id = "2caef254";
const api_key = "e96904484799cee65c9b08ee51249e72";



searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    searchQuery=e.target.querySelector("input").value;
    // console.log(searchQuery);
    fetchApi();
});

async function fetchApi(){
    const baseUrl = `https://api.edamam.com/search?q=${searchQuery}&app_id=${api_id}&app_key=${api_key}&from=0&to=30`;
    const response = await fetch(baseUrl); 
    const data = await response.json();
    generate(data.hits);
    console.log(data);
};

function generate(results){
    container.classList.remove("initial");
    let generatedHtml = "";
    results.map((result)=>{
        generatedHtml+=
        `
            <div class="item">
                <img src="${result.recipe.image}" alt="food">
                <div class="flex-container">
                    <h1 class="title">${result.recipe.label}</h1>
                    <a href="${result.recipe.url}" target="_blank" class="view-btn">View Recipe</a>
                </div>
                <b><p class="item-data">${result.recipe.healthLabels[2]}</p></b>
                <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
                <p class="item-data">Dish Type: ${result.recipe.dishType!==undefined?result.recipe.dishType.toString().charAt(0).toUpperCase()+result.recipe.dishType.toString().slice(1):""}</p> 
                <p class="item-data">Cuisine: ${result.recipe.cuisineType.toString().split(",").map(word => word.charAt(0).toUpperCase()+word.slice(1)).join(", ")}</p>
                <p class="item-data">Source: ${result.recipe.source}</p>
                </div>

        `  
    });
    searchResult.innerHTML=generatedHtml;
}   


