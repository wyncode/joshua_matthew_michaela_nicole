import React from 'react';
import axios from 'axios';
import { startCase } from '../utils';
import Navbar from '../components/Navbar';
import '../components/Drink.css';
// import '../images/bar-drinks.jpeg';

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
        if (!value || !value.trim() || value === '↵') return acc;
        if (key.includes('Ingredient')) {
          const index = key.slice(-1);
          const ingredient = data[key] || '';
          const measurement = data[`strMeasure${index}`] || '';
          acc.ingredients.push(`${measurement} ${ingredient}`.trim());
        }
        acc[key] = value;
        return acc;
      }, { ingredients: [] });
      const refetch = drink.strAlcoholic === 'Non alcoholic';
      this.setState({ drink, refetch });
    });
  };
  
  render() {
    const { drink } = this.state;
    console.log('rendering', this.state.drink);
    return (
      <div className="myDrink">
        <Navbar />
        {/* <h3>Your Drink</h3> */}
        <div className="drinkDivider animated fadeInDown">
          <span />
          <span>{drink.strDrink}</span>
          <span />
      </div>
      {/* <h1 className="myDrink2">{drink.strDrink}</h1> */}
        
        
        <div className="myDrinkpic">
          <div id="myDrink-img">
            <img className="myDrink-test animated fadeInDown"src={drink.strDrinkThumb} />
          </div>

        <div className="drinkDetails animated fadeInDown">
          <h3>Ingredients</h3>
          {drink.ingredients && drink.ingredients.map(ingredient => <p>{startCase(ingredient)}</p>)}
          <div className="drinkInstructions">
            <h3>Instructions</h3>
              <p>{drink.strInstructions}</p>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default MyDrink;
