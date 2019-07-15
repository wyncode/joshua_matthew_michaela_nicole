import React from 'react';
import Search from '../components/Search';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    //  <React.Fragment>

    <div id="container">
      <div id="Lorem-ipsum-dolor-am">Lorem ipsum dolor amet, consectetur</div>

      <div id="Lorem-ipsum-dolor-si">
        Lorem ipsum dolor sit amet,consectetur adipisiging elit, sed do eiusmod tempor incididunt ut labore et dolore
      </div>

      <div id="button-box">
        <button id="button">Lorem ipsum</button>
        {/* Lorem ipsum dolor sit amet,consectetur
                adipisiging elit, sed do eiusmod tempor 
                incididunt ut labore et dolore */}
      </div>

      {/* <div id="button-box">
              <button type="button" id="button">Lorem ipsum</button>
              </div> */}

      {/* <div id="button-box">

                <button type="button" id="button">Lorem ipsum</button>
              </div> */}
    </div>
  );
};

class Home extends React.Component {
  state = { drinks: [] };

  findDrinks = searchWord => {
    // console.log("finding drinks", this);
    axios.get(`/drinks/${searchWord}`).then(response => this.setState({ drinks: response.data.drinks }));
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
          <div id="DrinkResults">
            {this.state.drinks.map(drink => (
              <Link key={drink.idDrink} to={`/MyDrink/${drink.idDrink}`}>
                <div className="Drink">
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
