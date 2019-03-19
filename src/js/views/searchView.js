import { elements } from './base';

//implicit return- automatically returns one liners without brackets
export const getInput = () => elements.searchInput.value;

const renderRecipe = recipe => {
  const markup = `
    <li>
      <a class="results__link" href="#${recipe.recipe_id}">
          <figure class="results__fig">
              <img src="${recipe.image_url}" alt="${recipe.title}>
          </figure>
          <div class="results__data">
              <h4 class="results__name">${recipe.title}</h4>
              <p class="results__author">${recipe.publisher}</p>
          </div>
      </a>
    </li>
  `;
  
  //place html before or after in DOM with insertAdjacentHTML method
  elements.searchResList.insertAdjacentHTML('beforeend', markup);
}

export const renderResults = (recipes) => {
  recipes.forEach(renderRecipe)
}