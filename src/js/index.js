//CONTROLLER
import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { elements, renderLoader, clearLoader } from './views/base';

/**Global State of the App
 * - Search object
 * - current recipe object
 * - shopping list object
 * - liked recipes
 */
const state = {}


/****************************************
 * SEARCH CONTROLLER
 */

const controlSearch = async () => {
  // 1) Get query from view
  const query = searchView.getInput();

  if (query) {
    // 2) New search object and add to state
    state.search = new Search(query);

    // 3) Prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    try {
      // 4) Search for recipes
      await state.search.getResults();

      // 5) Render results on UI
      clearLoader();
      searchView.renderResults(state.search.result);
    } catch (err) {
      alert('Something wrong with the search...');
      clearLoader();
    }
  }
}


elements.searchForm.addEventListener('submit', e => {
  //prevents page from reloading on submit
  e.preventDefault();
  controlSearch();
})


//event delegation. tried to figure out wwhere click happened
//using .closest() method will find the closest element with the '.btn-inline' class. so it wont select any of the child elements
elements.searchResPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  //if there is a button
  if (btn) {
    //the 10 is the base of the number. means 0-9
    const goToPage = parseInt(btn.dataset.goto, 10);
    searchView.clearResults();
    searchView.renderResults(state.search.result, goToPage)
  }
})



/*******************************************
 * RECIPE CONTROLLER
 */

const controlRecipe = async () => {
  // Get ID from url
  const id = window.location.hash.replace('#', '');

  if (id) {
    // Prepare UI for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe);

    // Highlight selected search item
    if (state.search) searchView.highlightSelected(id);

    // Create new recipe object
    state.recipe = new Recipe(id);

    try {
      // Get recipe data and parse ingredients
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();

      // Calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();

      // Render recipe
      clearLoader();
      recipeView.renderRecipe(state.recipe);

    } catch (err) {
      console.log(err);
      alert('Error processing recipe!');
    }
  }
};


// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

// refactored for adding same eventlistener to multiple events
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

//handling recipe button clcks
elements.recipe.addEventListener('click', e => {
  //turns out to be true if the target matches btn-decrease or any child element of the btn-decrease. * is any
  if (e.target.matches('.btn-decrease, .btn-decrease *')) {
    // Decrease button is clicked
    if (state.recipe.servings > 1) {
      state.recipe.updateServings('dec');
      recipeView.updateServingsIngredients(state.recipe);
    }
  } else if (e.target.matches('.btn-increase, .btn-increase *')) {
    // Increase button is clicked
    state.recipe.updateServings('inc');
    recipeView.updateServingsIngredients(state.recipe);
} 
  console.log(state.recipe)
})

window.l = new List();