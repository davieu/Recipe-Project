import axios from 'axios';
import { keys } from '../config';

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const res = await axios(`https://www.food2fork.com/api/get?key=${keys.key2}&rId=${this.id}`)

      this.title = res.data.recipe.title;
      this.authur = res.data.recipe.publisher;
      this.img = res.data.recipe.image_url; 
      this.url = res.data.recipe.source_url;
      this.ingredients = res.data.recipe.ingredients;
    } catch(error) {
      console.log(error)
      alert('Error in async await class');
    }
  }

  calcTime() {
    //assuming that we need 15min for each 3 ingredients
    const numIngredients = this.ingredients.length;
    const periods = Math.ceil(numIngredients / 3);
    this.time = periods * 15;
  }

  calcServings() {
    this.servings = 4;
  }
}