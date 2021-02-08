// load search data from api
const searchItem = () => {
  const searchText = document.getElementById('search-meal').value;
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
  fetch (url) 
  .then (res => res.json())
  .then (data => showMeals(data.meals));
}

//show items when searched
const showMeals = meals => {
  const mealsContainer = document.querySelector('#food-item-container .row');
  mealsContainer.innerHTML = '';
  meals.forEach(meal => {
    const mealDiv = document.createElement('div');
    mealDiv.className = 'col-md-3 my-2';
    mealDiv.innerHTML = `
            <div class="card shadow mb-5 bg-white custom-rounded" data-bs-toggle="modal" data-bs-target="#itemInfo-${meal.idMeal}">
              <img class="card-img-top" src= "${meal.strMealThumb}">
                <div class="card-body">
                  <h5 class="text-center">${meal.strMeal}</h5>
                </div>
            </div>${showInfo(meal)}`;

    mealsContainer.appendChild(mealDiv);
  });
}
//show extra information when clicked
const showInfo = meal => {
  return `<div class="modal fade" id="itemInfo-${meal.idMeal}" tabindex="-1" aria-labelledby="itemInfo-${meal.idMeal}Label" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <img src=${meal.strMealThumb} class="img-fluid my-4">
            <h4 class="text-center mx-3 text-success">Ingredients</h4>
            <div><i class="fas fa-check-square"></i> ${meal.strIngredient1}</div>
            <div><i class="fas fa-check-square"></i> ${meal.strIngredient2}</div>
            <div><i class="fas fa-check-square"></i> ${meal.strIngredient3}</div>
            <div><i class="fas fa-check-square"></i> ${meal.strIngredient4}</div>
            <div><i class="fas fa-check-square"></i> ${meal.strIngredient5}</div>
          </div>
        </div>
      </div>
    </div>`
}
