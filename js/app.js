const loadmeal = (search) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
  fetch(url)
    .then((result) => result.json())
    .then((data) => meals(data.meals));
  const searchTitle = document.getElementById("search-title");
  const searchTitleText = document.createElement("p");
  searchTitle.innerHTML = ``;
  searchTitleText.innerHTML = `
  Showing Results For <b>${search}</b>
  `;
  searchTitle.appendChild(searchTitleText);
};

//go
const meals = (meal) => {
  const getElement = document.getElementById("meal-container");
  getElement.textContent = ``;
  const searchTitle = document.getElementById("search-title");
  const resultText = document.createElement("p");
  resultText.innerHTML = `Total <b>${meal.length}</b> Recipe found`;
  searchTitle.appendChild(resultText);

  //show 6 result per page
  meal.forEach((meal) => {
    const createElement = document.createElement("div");
    createElement.classList.add("col");
    createElement.innerHTML = `
    <div class="card">
    <img src="${meal.strMealThumb}" class="img-thumbnail" alt="${meal.strMeal}">
    <div class="card-body">
      <h5 class="card-title" title ="${meal.strMeal}">${meal.strMeal.slice(
      0,
      30
    )}</h5>
      <p class="card-text">${meal.strMeal.slice(0, 50)}</p>
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="getDetails(${
        meal.idMeal
      })">
      Learn More
    </button>
    </div>
  </div>

  <!-- Modal start -->


<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="mealDetails" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content w-100">
      <div class="modal-header">
        <h5 class="modal-title" id="mealDetails">${meal.strMeal}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" id="details-body">
      
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Okay</button>
      </div>
    </div>
  </div>
</div>
    `;
    getElement.appendChild(createElement);
  });
  toggleLoader(false);
};

document.getElementById("search-btn").addEventListener("click", function () {
  toggleLoader(true);
  const getSearchField = document.getElementById("search-meals-field");

  const searchText = getSearchField.value;
  loadmeal(searchText);
});
//loader
const toggleLoader = (isLoading) => {
  const getLoader = document.getElementById("loader");
  if (isLoading) {
    getLoader.classList.remove("d-none");
  } else {
    getLoader.classList.add("d-none");
  }
};

//get details

const getDetails = (id) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  fetch(url)
    .then((result) => result.json())
    .then((data) => details(data.meals));
};
const details = (id) => {
  console.log(id[0].strMeal);
  const getElement = document.getElementById("details-body");
  getElement.innerHTML = `
  <img src="${id[0].strMealThumb}" class="img-thumbnail" alt="${id[0].strMealThumb}">
  <p class="text-center py-2"><b>Instruction: </b></p>
  <p class="text-center">${id[0].strInstructions}</p>
  <p class="text-center py-2"><b>Video: </b></p> <iframe width="420" height="315"
  src="${id[0].strYoutube}">
  </iframe>
  `;
};
loadmeal("beef");
