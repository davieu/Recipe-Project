import { elements } from './base';

//implicit return- automatically returns one liners without brackets
export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
  elements.searchInput.value = '';
}

//limit param has a DEFAULT param
const limitRecipeTitle = (title, limit = 17) => {
  const newTitle = [];

  if (title.split(' ')[0].length > limit) {
    let longTitle = `${title.substring(0, limit)}...`
    return longTitle
  }

  if (title.length > limit) {
    title.split(' ').reduce((accumulator, current) => {
      if (accumulator + current.length <= limit) {
        newTitle.push(current)
      } 
      return accumulator + current.length
    }, 0)
    //return the result
    return `${newTitle.join(' ')}...`;
  }

  return title;
}

const renderRecipe = recipe => {
  const markup = `
  <li>
    <a class="results__link" href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="${recipe.title}">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
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

export const clearResults = () => {
  elements.searchResList.innerHTML = '';
}