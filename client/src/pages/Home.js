import React from "react";
import Search from "../components/Search";
import axios from "axios";

class Home extends React.Component {
  state = { drinks: [] };

  findDrinks = searchWord => {
    console.log("finding drinks", this);
    axios
      .get(`/drinks/${searchWord}`)
      .then(response => this.setState({ drinks: response.data.drinks }));
  };

  render() {
    console.log(this.state.drinks);
    return (
      <div>
        <h1>Hello I am the Home page</h1>
        <h2>If this was my real midterm I would make it look great!</h2>
        <Search findDrinks={this.findDrinks} />

        {/* <div id="drinks"> */}
        {/* {this.state.map(drink => ( */}
        {/* // <Link key={movie.imdbID} to={`/movies/${movie.imdbID}`}> */}
        {/* <div className="drink"> */}
        {/* <h3>{}</h3> */}
        {/* <img src={movie.Poster} /> */}
        {/* </div> */}
        {/* </Link> */}
        {/* ))} */}
        {/* </div> */}
      </div>
    );
  }
}

export default Home;
