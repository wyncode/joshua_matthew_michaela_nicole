import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { startCase } from '../utils';
import Navbar from '../components/Navbar';

class RandomDrinks extends React.Component {
  state = { drink: {}, refetch: true };

  componentDidMount() {
    this.fetchDrinks();
  }
  componentDidUpdate() {
    if (this.state.refetch) this.fetchDrinks();
  }
  fetchDrinks = () => {
    axios.get('/random-drink').then(response => {
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
    const { drink, refetch } = this.state;
    console.log('rendering', this.state.drink);
    return (
      <>
        {refetch ? (
          <div className="loader" />
        ) : (
          <>
            <div className="random-container">
              <Navbar />

              <h1 id="random-title">{drink.strDrink}</h1>

              <div className="drink">
                <div id="random-image">
                  <img src={drink.strDrinkThumb} alt="random-drink" />
                </div>

                <div id="drinkInfo">
                  <h3>Ingredients</h3>
                  {drink.ingredients &&
                    drink.ingredients.map(ingredient => <p className="rand-ins">{startCase(ingredient)}</p>)}
                  <h3>Instructions</h3>
                  <p>{drink.strInstructions}</p>
                </div>
              </div>
            </div>
          </>
        )}
        {/* </div> */}
      </>
    );
  }
}

export default RandomDrinks;
