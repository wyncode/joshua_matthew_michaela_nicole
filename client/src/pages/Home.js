import React from 'react';
import Search from '../components/Search';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../components/search-inputs.css';
import '../components/drink-results.css';
import '../components/submit-button.css';
import '../components/suggestion-list.css';

const Welcome = () => {
  return (
    <div id="container">
      <Navbar id="random-nav" />

      <div id="home-container">
        <div id="Lorem-ipsum-dolor-am">Spruce up your date night. Make cocktails like a pro.</div>

        <div id="Lorem-ipsum-dolor-si">
          Show your special someone your drink making skills. Date night will never be the same. Go ahead. Tell us.
          What's in your fridge?
        </div>

        <div id="button-box">
          <a href="#search">
            <button id="home-button">Make a drink!</button>
          </a>
        </div>
      </div>
    </div>
  );
};

class Home extends React.Component {
  state = { drinks: [], errorMessage: '' };

  getErrorMessage = () => (
    <div className="error-container">
      <h1 className="error-message">Sorry, no drinks can be found with your ingredients</h1>
      <img
        src="https://www.trzcacak.rs/myfile/full/463-4632543_sad-face-transparent-clipart-png-download-sad-boys.png"
        alt="sad face"
      />
    </div>
  );
  findDrinks = searchWord => {
    // console.log("finding drinks", this);
    axios.get(`/drinks/${searchWord}`).then(({ data }) => {
      const dataDrinksIsArray = Array.isArray(data.drinks);
      this.setState({ drinks: dataDrinksIsArray ? data.drinks : [] });
      this.setState({ errorMessage: dataDrinksIsArray && data.drinks.length ? '' : this.getErrorMessage() });
    });
  };

  handleEmptyData = () => {
    if (this.state.drinks.length) {
      // this.setState({ errorMessage: '' });
      return this.state.drinks.map(drink => (
        <Link key={drink.idDrink} to={`/MyDrink/${drink.idDrink}`}>
          <div className="individual-drink">
            <h4>{drink.strDrink}</h4>
            <img src={drink.strDrinkThumb} alt={drink.strDrink} />
          </div>
        </Link>
      ));
    } else {
      return this.state.errorMessage;
    }
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
          <div id="drink-results">{this.handleEmptyData()}</div>
        </div>
      </div>
    );
  }
}

export default Home;
