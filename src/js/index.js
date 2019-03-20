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
      alert(error)
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

 const r = new Recipe('46956')
 r.getRecipe();
 console.log(r)