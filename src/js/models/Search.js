import axios from 'axios';

export default class Search {
  constructor(query, num1, num2) {
    this.query = query;
    this.num1 = num1;
    this.num2 = num2;
  }

  async getResults() {
    const proxy = 'https://cors-anywhere.herokuapp.com/'
    const key = 'd4d18ccb0883c5590694cb34bfdd0a27';
    try {
      const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`)
      this.result = res.data.recipes;
      console.log(this.result);
    } catch(error) {
        alert(error);
    }; 
  }

  add() {
    console.log(this.num1 + this.num2)
  }
};

