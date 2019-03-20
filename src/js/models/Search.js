import axios from 'axios';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    const proxy = 'https://cors-anywhere.herokuapp.com/'
    const key = 'd4d18ccb0883c5590694cb34bfdd0a27';
    const key2 = '5c7e6ea185d2cbcdee0af83572306649';
    try {
      const res = await axios(`https://www.food2fork.com/api/search?key=${key2}&q=${this.query}`)
      this.result = res.data.recipes;
      // console.log(this.result);
    } catch(error) {
        alert(error);
    }; 
  }
};

