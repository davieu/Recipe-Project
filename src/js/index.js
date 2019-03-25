//CONTROLLER
import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
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
  //get query from view
  const query = searchView.getInput();
  console.log(query)

  //if there is a query then execute
  if (query) {
    // new search object and add to state
    state.search = new Search(query);

    //prepare ui for results/ loading 
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);
    //search for recipes and await for the promise
    try {
    await state.search.getResults();
    } catch (error) {
      alert('Error in processing control search')
      clearLoader();
    }

    //render results on ui
    clearLoader()
    searchView.renderResults(state.search.result)
    console.log(state.search.result)
    
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
  //get ID from url
  const id = window.location.hash.replace('#', '');  
  console.log(id)

  if (id) {
    //prepare UI for changes

    //Create new recipe object
    state.recipe = new Recipe(id);
    //get recipe data
    try {
      await state.recipe.getRecipe();
      //calculate servings and time
      state.recipe.calcTime();
      state.recipe.calcServings();
      //render recipe
      console.log(state.recipe)
    } catch(error) { 
      alert('Error processing recipe');
    }

  }
};


// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

// refactored for adding same eventlistener to multiple events
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
