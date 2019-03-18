import Search from './models/Search';

const search = new Search('pizza', 5, 8);
console.log(search);
search.getResults();
search.add();