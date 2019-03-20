import { elements } from './base';

//implicit return- automatically returns one liners without brackets
export const getInput = () => elements.searchInput.value;

//clears the list of displayed recipes
export const clearInput = () => {
  elements.searchInput.value = '';
}

//method  .reduce((accumulator, current) => { }, 0) zero is initial 
/* 
  'Pasta with tomato and spinach' this is explaining the reduce method
  acc: 0 / acc + cur.length = 5 / newTitle = ['Pasta']
  acc: 5 / acc + cur.length = 9 / newTitle = ['Pasta', 'with']
  acc: 9 / acc + cur.length = 15 / newTitle = ['Pasta', 'with', 'tomato']
  acc: 15 / acc + cur.length = 18 / newTitle = ['Pasta', 'with', 'tomato']
  acc: 18 / acc + cur.length = 24 / newTitle = ['Pasta', 'with', 'tomato']
*/
//limit param has a DEFAULT param
const limitRecipeTitle = (title, limit = 17) => {
  const newTitle = [];

  //splitting the title/string into array and seeing if first word > limit
  //if larger than limit than on print to DOM a substring up to 17 characters long
  if (title.split(' ')[0].length > limit) {
    let longTitle = `${title.substring(0, limit)}...`
    return longTitle
  }

  //splits title and checks the words that will fit for display no loonger than limit
  if (title.length > limit) {
    title.split(' ').reduce((accumulator, current) => {
      if (accumulator + current.length <= limit) {
        newTitle.push(current)
      } 
      return accumulator + current.length
    }, 0);
    //return the result
    return `${newTitle.join(' ')}...`;
  }

  return title;
}

const renderRecipe = recipe => {
  const markup = `
  <li title="${recipe.title}">
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