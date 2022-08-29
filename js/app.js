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
  meal.forEach((meal) => {
    // console.log(meal);
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
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" id="meal-details">
      Learn More
    </button>
    </div>
  </div>

  <!-- Modal start -->


<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">${meal.strMeal}</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body" id="details-body">
      <img src="${meal.strMealThumb}" class="img-thumbnail" alt="${
      meal.strMeal
    }">
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
};

loadmeal("fish");
