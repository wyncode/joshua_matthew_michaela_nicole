import React from 'react';
import axios from 'axios';
import { startCase } from '../utils';
import Navbar from '../components/Navbar';
import '../components/RandomDrink.css';

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
      const drink = Object.keys(data).reduce(
        (acc, key) => {
          const value = data[key];
          if (!value || !value.trim() || value === '↵') return acc;
          if (key.includes('Ingredient')) {
            const index = key.slice(-1);
            const ingredient = data[key] || '';
            const measurement = data[`strMeasure${index}`] || '';
            acc.ingredients.push(`${measurement} ${ingredient}`.trim());
          }
          acc[key] = value;
          return acc;
        },
        { ingredients: [] }
      );
      const refetch = drink.strAlcoholic === 'Non alcoholic';
      this.setState({ drink, refetch });
    });
  };

  render() {
    const { drink, refetch } = this.state;
    console.log('rendering', this.state.drink);
    return (
      <>
        {refetch ? (
          <div className="loader" />
        ) : (
          <>
            <Navbar />
            <div className="background-image">
              <div className="body-random">
                <div className="random-container">
                  {/* <Navbar /> */}
                  <div className="divider">
                    <span />
                    <span className="animated fadeInUp">{drink.strDrink}</span>
                    <span />
                  </div>
                  {/* <h1 className="random-title">{drink.strDrink}</h1> */}

                  <div className="drink">
                    <div id="random-image" className="animated fadeInDown">
                      <img src={drink.strDrinkThumb} alt="random-drink" />
                    </div>

                    <div className="drinkInfo" className="animated fadeInDown">
                      <input
                        type="button"
                        className="random-button"
                        value="Serve Me Another!"
                        onClick={this.fetchDrinks}
                      />

                      <div className="random-ingredients">
                        <h2>Ingredients</h2>
                        {drink.ingredients &&
                          drink.ingredients.map(ingredient => <p className="rand-ins">{startCase(ingredient)}</p>)}
                      </div>

                      <h2>Instructions</h2>
                      <p>{drink.strInstructions}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
  }
}

export default RandomDrinks;
