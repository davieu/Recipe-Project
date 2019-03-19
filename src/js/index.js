import Search from './models/Search';

/**Global State of the App
 * - Search object
 * - current recipe object
 * - shopping list object
 * - liked recipes
 */

 

const state = {}

const controlSearch = async () => {
  //get query from view
  const query = 'pizza'

  //if there is a query then execute
  if (query) {
    // new search object and add to state
    state.search = new Search(query);

    //prepare ui for results/ loading 

    //search for recipes and await for the promise
    try {
    await state.search.getResults();
    } catch (error) {
      alert(error)
    }

    //render results on ui
    console.log(state.search.result)
  }
}



document.querySelector('.search').addEventListener('submit', e => {
  //prevents page from reloading on submit
  e.preventDefault();
  controlSearch();
})





