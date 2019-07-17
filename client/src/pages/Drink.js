import React from 'react';
import axios from 'axios';
import { startCase } from '../utils';
import Navbar from '../components/Navbar';
import '../components/Drink.css';
import '../images/bar-drinks.jpeg';



class MyDrink extends React.Component {
  state = { drink: {} };

  componentDidMount() {
    this.fetchDrinks();
  }
  componentDidUpdate() {
    if (this.state.refetch) this.fetchDrinks();
  }

  fetchDrinks = () => {
    axios.get(`/pages/Drink/${this.props.match.params.id}`).then(response => {
      const data = response.data.drinks[0];
      const drink = Object.keys(data).reduce((acc, key) => {
        const value = data[key];
        if (value && value !== '↵' && value.trim()) acc[key] = value;
        return acc;
      }, {});
      const refetch = drink.strAlcoholic === 'Non alcoholic';
      const ingredients = this.parseIngredient(drink);
      this.setState({ drink: { ...drink, ...ingredients }, refetch });
    });
  };

  parseIngredient = (drink = {}) =>
    Object.keys(drink).reduce(
      (acc, key) => {
        if (key.includes('Ingredient')) {
          const index = key.slice(-1);
          const ingredient = drink[key] || String();
          const measurement = drink[`strMeasure${index}`] || '';
          acc.ingredients.push(`${measurement} ${ingredient}`.trim());
        }
        return acc;
      },
      { ingredients: [] }
    );

  render() {
    const { drink } = this.state;
    console.log('rendering', this.state.drink);
    return (
      <div>
        <Navbar id="random-nav" />
        <h3>Your Drink</h3>
        <div className="drink-container">
          <div className="myDrink" >
           <h1 >{drink.strDrink}</h1>
          </div>
        </div>

        <div className="myDrinkpic">
          <img src={drink.strDrinkThumb} />
        </div>

        <div className="drinkDetails">
          <h3>Ingredients</h3>
          {drink.ingredients && drink.ingredients.map(ingredient => <p>{startCase(ingredient)}</p>)}
          <h3>Instructions</h3>
          <p>{drink.strInstructions}</p>
        </div>
      </div>
    );
  }
}

export default MyDrink;
