import axios from 'axios';
import { keys } from '../config';

export default class Search {
  constructor(query) {
    this.query = query;
  }

  async getResults() {
    try {
      const res = await axios(`https://www.food2fork.com/api/search?key=${keys.key2}&q=${this.query}`)
      this.result = res.data.recipes;
      // console.log(this.result);
    } catch(error) {
      console.log(error)
        alert(error);
    }; 
  }
};

