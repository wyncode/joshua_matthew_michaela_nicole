import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { startCase } from '../utils';

class RandomDrinks extends React.Component {
    state = { drink: {}, refetch: true }

    componentDidMount(){
        this.fetchDrinks()
    }
    componentDidUpdate() {
        if (this.state.refetch) this.fetchDrinks()
    }
    fetchDrinks = () => {
        axios.get('/random-drink').then(response => {
            const data = response.data.drinks[0]
            const drink = Object.keys(data).reduce((acc, key) => {
                const value = data[key]
                if (value && value !== "↵" && value.trim()) acc[key] = value
                return acc
            }, {})
            const refetch = drink.strAlcoholic === "Non alcoholic"
            const ingredients = this.parseIngredient(drink)
            this.setState({ drink: { ...drink, ...ingredients }, refetch })
        })
    }
    parseIngredient = (drink = {}) => Object.keys(drink).reduce((acc, key) => {
        if (key.includes('Ingredient')) {
          const index = key.slice(-1)
          const ingredient = drink[key] || String()
          const measurement = drink[`strMeasure${index}`] || ""
          acc.ingredients.push(`${measurement} ${ingredient}`.trim())
        }
        return acc
      }, { ingredients: [] })



    render(){
        const { drink, refetch } = this.state
        console.log('rendering', this.state.drink)
        return (
            <>
            
            {refetch 
            ? <div className="loader"></div>
            : (
                <>
                    <div className="container">
                    <h1>{drink.strDrink}</h1>
                        <div className="drink">
                        
                            <div>
                            <img src={drink.strDrinkThumb} />
                            </div>
                        
                            <div id="drinkInfo">
                            <h3>Ingredients</h3>
                            {drink.ingredients && drink.ingredients.map(ingredient => <p>{startCase(ingredient)}</p>)}
                            <h3>Instructions</h3>
                            <p>{drink.strInstructions}</p>
                             <button>Randomize</button>
                            </div>

                        </div>
                    </div>
                </>
            )
            }
            {/* </div> */}
            </>
        )
    }
}

export default RandomDrinks
