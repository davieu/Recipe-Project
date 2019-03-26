import { elements } from './base';

//implicit return- automatically returns one liners without brackets
export const getInput = () => elements.searchInput.value;

//clears the list of displayed recipes
export const clearInput = () => {
  elements.searchInput.value = '';
};

export const clearResults = () => {
  elements.searchResList.innerHTML = '';
  elements.searchResPages.innerHTML = '';
};

export const highlightSelected = id => {
  const resultsArr = Array.from(document.querySelectorAll('.results__link'));
  resultsArr.forEach(el => {
      el.classList.remove('results__link--active');
  });
  document.querySelector(`.results__link[href*="${id}"]`).classList.add('results__link--active');
};

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
  elements.searchResList.insertAdjacentHTML('beforeend', markup);
};

//type: 'prev' or 'next' for the buttons for pagination
//using data attribute
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
      <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
      <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
      </svg>
    </button>
`;


//PAGINATION this will add the buttons for next or go back a page
const renderButtons = (page, numResults, resPerPage) => {
  //this app has 30 results total / 10 res per page. 
  const pages = Math.ceil(numResults / resPerPage);

  let button;
  if (page === 1 && pages > 1) {
    // Only button to go to next page
    button = createButton(page, 'next');
  } else if (page < pages) {
      // Both buttons
      button = `
        ${createButton(page, 'prev')}
        ${createButton(page, 'next')}
      `;
  } else if (page === pages && pages > 1) {
      // Only button to go to prev page
      button = createButton(page, 'prev');
  }

  elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

//pagination for how many recipes load up on page
export const renderResults = (recipes, page = 1, resPerPage = 10) => {
  // render results of currente page
  const start = (page - 1) * resPerPage;
  const end = page * resPerPage;

  recipes.slice(start, end).forEach(renderRecipe);

  // render pagination buttons
  renderButtons(page, recipes.length, resPerPage);
};

