// load search data from api
const searchItem = async () => {
  const searchText = document.getElementById('search-term').value;
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
  try {
    const res = await fetch(url);
    const data = await res.json();
    showItems(data.meals);
  } catch (error) {
    showErrorMsg('Item not found! Try putting a different name');
  }
}

const showItems = items => {
  const itemContainer = document.querySelector('#food-item-container .row');
  itemContainer.innerHTML = '';
  items.forEach(item => {
    const mealDiv = document.createElement('div');
    mealDiv.className = 'col-md-3 my-2';
    mealDiv.innerHTML = `
            <div class="card shadow mb-5 bg-white custom-rounded" data-bs-toggle="modal" data-bs-target="#itemInfo-${item.idMeal}">
              <img class="card-img-top" src= "${item.strMealThumb}">
                <div class="card-body">
                  <h5 class="text-center">${item.strMeal}</h5>
                </div>
            </div>${showInfo(item)}`;

    itemContainer.appendChild(mealDiv);
  });
}

const showInfo = item => {
  return `<div class="modal fade" id="itemInfo-${item.idMeal}" tabindex="-1" aria-labelledby="itemInfo-${item.idMeal}Label" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h2 class="modal-title text-center" id="itemInfo-${item.idMeal}Label">${item.strMeal}</h2>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <img src=${item.strMealThumb} class="img-fluid img-thumbnail my-4">
            <h4 class="text-center mx-3 text-success">Ingredients List</h4>
            <div><i class="fas fa-check-square"></i> ${item.strIngredient1}</div>
            <div><i class="fas fa-check-square"></i> ${item.strIngredient2}</div>
            <div><i class="fas fa-check-square"></i> ${item.strIngredient3}</div>
            <div><i class="fas fa-check-square"></i> ${item.strIngredient4}</div>
            <div><i class="fas fa-check-square"></i> ${item.strIngredient5}</div>
          </div>
        </div>
      </div>
    </div>`
}

// show error message
const showErrorMsg = message => {
  const errorMsgContainer = document.getElementById('errorMsg');
  errorMsgContainer.innerHTML = `<h1 class="text-center text-warning">${message}</h1>`;
}




