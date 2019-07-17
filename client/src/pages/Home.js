import React from 'react';
import Search from '../components/Search';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Welcome = () => {
  return (
    <div id="container">
      <div id="home-container">
        <Navbar id="random-nav" />

        <div id="Lorem-ipsum-dolor-am">Spruce up your date night. Make cocktails like a pro.</div>

        <div id="Lorem-ipsum-dolor-si">
          Show your special someone your drink making skills. Date night will never be the same. Go ahead. Tell us.
          What's in your fridge?
        </div>

        <div id="button-box">
          <button id="home-button">Make a drink!</button>
        </div>
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
