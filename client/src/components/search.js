import React from "react";
import axios from "axios";

class SearchDrinks extends React.Component {
  state = { searchWord: "" }; // declaring an empty state object

  handleChange = event => {
    console.log(event.target.value);
    const searchWord = event.target.value; // assigning the target value to searchWord
    this.setState({ searchWord }); // updating state with searchWord
  };
  handleSubmit = event => {
    console.log(this.state.searchWord); // prints out the submitted searchWord
    event.preventDefault(); // prevents page from reloading
    this.props.findDrinks(this.state.searchWord);
    this.setState({ searchWord: "" });
  };
  render() {
    console.log(this.props);
    return (
      <div>
        <h1>This is search</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="search"
            placeholder="Search"
            autoComplete="off"
            onChange={this.handleChange}
            value={this.state.searchWord}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    ); // end of return
  } // end of render
} // end of class

export default SearchDrinks;
