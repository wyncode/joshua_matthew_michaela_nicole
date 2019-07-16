import React from 'react';
import Search from '../components/Search';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Welcome = () => {
  return (
    <div id="container">
      <Navbar />
      <div id="Lorem-ipsum-dolor-am">Lorem ipsum dolor amet, consectetur</div>

      <div id="Lorem-ipsum-dolor-si">
        Lorem ipsum dolor sit amet,consectetur adipisiging elit, sed do eiusmod tempor incididunt ut labore et dolore
      </div>

      <div id="button-box">
        <button id="button">Lorem ipsum</button>
      </div>
    </div>
  );
};

class Home extends React.Component {
  state = { drinks: [] };

  findDrinks = searchWord => {
    // console.log("finding drinks", this);
    axios.get(`/drinks/${searchWord}`).then(({ data }) => {
      this.setState({ drinks: Array.isArray(data.drinks) ? data.drinks : [] });
    });
  };

  render() {
    console.log(this.state.drinks);
    return (
      <div>
        <Welcome />
        <div id="search-container">
          <Search findDrinks={this.findDrinks} />
          <h2 id="divider">
            <span>Your Cocktails</span>
          </h2>
          <div id="drink-results">
            {this.state.drinks.map(drink => (
              <Link key={drink.idDrink} to={`/MyDrink/${drink.idDrink}`}>
                <div className="individual-drink">
                  <h4>{drink.strDrink}</h4>
                  <img src={drink.strDrinkThumb} alt={drink.strDrink} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
