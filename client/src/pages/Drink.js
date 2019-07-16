import React from 'react';
import axios from 'axios';
import './Drink.css';


class MyDrink extends React.Component {
  state = { drink: {} };
  


componentDidMount(){
  axios.get(`/pages/Drink/${this.props.match.params.id}`)
   .then(response => {
    this.setState({drink: response.data.drinks[0]})
    console.log(this.state.drink)
   })
}

  render(){
    const {drink} = this.state
    console.log('rendering', this.state.drink)
    return(
      <div>
        <h3>Your Drink</h3>
        <div className="container">
            <h1>{drink.strDrink}</h1>
            <div className="drink"></div>


            <div id="drink photo">
              <img src= {drink.strDrinkThumb} />
            </div>  

            <div id="drink info">
              <h3>Ingredients</h3>
            </div>


        </div>
      </div>
    )
  }
}

export default MyDrink

