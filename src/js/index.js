// d4d18ccb0883c5590694cb34bfdd0a27 
// https://www.food2fork.com/api/search

// https://www.food2fork.com/api/get 
import axios from 'axios';
async function getResults(query) {
  const proxy = 'https://cors-anywhere.herokuapp.com/'
  const key = 'd4d18ccb0883c5590694cb34bfdd0a27' 
  const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${query}`)
  console.log(res);
}

getResults('pizza');