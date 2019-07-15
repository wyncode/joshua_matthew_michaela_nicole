import React from 'react'
import axios from 'axios'

class MyDrink extends React.Component {
  state = { drink: {} }


componentDidMount(){
  axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=14029`)
   .then(response => this.setState({drink: response.data.drinks[0]}))
}

  render(){
    console.log('rendering', this.state.drink)
    return(
      <h1>hiiiiii</h1> 
    )
  }
}



export default MyDrink

