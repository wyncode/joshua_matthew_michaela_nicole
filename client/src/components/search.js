import React from 'react';
const axios = require('axios');

class SearchDrinks extends React.Component {
  state = {
    allIngredients: [],
    alcohol: '',
    activeInput: '',
    mixer: '',
    garnish: '',
    // The active selection's index
    activeSuggestion: 0,
    // The suggestions that match the user's input
    filteredSuggestions: [],
    // Whether or not the suggestion list is shown
    showSuggestions: false,
    // What the user has entered
    userInput: ''
  };

  componentDidMount() {
    axios.get(`https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list`).then(response => {
      const allIngredients = response.data.drinks.map(drink => drink.strIngredient1);
      this.setState({ allIngredients });
    });
    document.addEventListener('click', this.handleClickAway);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickAway);
  }

  handleClickAway = e => {
    const { className: classNames } = e.target;
    const className = classNames.split(' ')[0];
    const isInput = ['input__field', 'suggestions'];
    console.log('is input', isInput.includes(className));
    !isInput.includes(className) && this.setState({ activeInput: '' });
  };

  onChange = e => {
    let parameter = e.currentTarget.name;
    console.log(parameter);
    this.setState({ [parameter]: e.currentTarget.value });
    console.log(`alc test: ${this.state.alcohol}`);
    console.log(`mix test: ${this.state[parameter]}`);

    const userInput = e.currentTarget.value;
    console.log(`userInput: ${userInput}`);

    // Filter our suggestions that don't contain the user's input
    const filteredSuggestions = this.state.allIngredients.filter(
      suggestion => suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    console.log(filteredSuggestions);
    // Update the user input and filtered suggestions, reset the active
    // suggestion and make sure the suggestions are shown
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      userInput: e.currentTarget.value
    });
  };

  // Event fired when the user clicks on a suggestion
  onClick = e => {
    // Update the user input and reset the rest of the state
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions: [],
      showSuggestions: false,
      userInput: e.currentTarget.innerText
    });
    console.log('onclicked!!!');
  };

  // Event fired when the user presses a key down
  onKeyDown = e => {
    const { activeSuggestion, filteredSuggestions } = this.state;

    // User pressed the enter key, update the input and close the
    // suggestions
    if (e.keyCode === 13) {
      this.setState({
        activeSuggestion: 0,
        showSuggestions: false,
        userInput: filteredSuggestions[activeSuggestion]
      });
    }
    // User pressed the up arrow, decrement the index
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion - 1 });
    }
    // User pressed the down arrow, increment the index
    else if (e.keyCode === 40) {
      if (activeSuggestion - 1 === filteredSuggestions.length) {
        return;
      }

      this.setState({ activeSuggestion: activeSuggestion + 1 });
    }
  };

  // passes through the ingredient key which also passes through that event
  handleIngredients = ingredient => e => {
    const userInput = e.target.value;
    // updating state to the ingredient key and the event targe value

    const filteredSuggestions = this.state.allIngredients.filter(suggestion =>
      suggestion.toLowerCase().includes(e.target.value.toLowerCase())
    );
    console.log(filteredSuggestions);
    // Update the user input and filtered suggestions, reset the active
    // suggestion and make sure the suggestions are shown
    this.setState({
      activeSuggestion: 0,
      filteredSuggestions,
      showSuggestions: true,
      [ingredient]: userInput,
      userInput
    });
  };

  handleSubmit = event => {
    // prevents page from reloading
    event.preventDefault();
    // saving the ingredients into one variable
    const ingredients = [this.state.mixer, this.state.alcohol, this.state.garnish].join(',');
    // feeding ingredients into the findDrinks function
    this.props.findDrinks(ingredients);
    // resetting the ingredients after submit
    this.setState({ alcohol: '', mixer: '', garnish: '' });
  };

  renderSuggestedInputs = () => {
    const { filteredSuggestions, showSuggestions, userInput, activeSuggestion } = this.state;
    return showSuggestions && userInput && filteredSuggestions.length ? (
      <ul class="suggestions">
        {filteredSuggestions.map((suggestion, index) => {
          const className = index === activeSuggestion ? 'suggestion-active' : '';
          return (
            <li className={className} key={suggestion} onClick={this.handleClick(suggestion)}>
              {suggestion}
            </li>
          );
        })}
      </ul>
    ) : (
      <div className="no-suggestions">{userInput && <em>Try again!</em>}</div>
    );
  };

  handleClick = suggestion => () =>
    this.setState({ [this.state.activeInput]: suggestion, activeInput: '', userInput: '' });

  render() {
    const {
      onKeyDown,
      state: { activeInput }
    } = this;
    console.log('STATE', this.state);
    return (
      <div id="search">
        <h1>search</h1>
        <form onSubmit={this.handleSubmit}>
          <section id="input-wrapper">
            <span className="input input--chisato">
              <input
                className={`input__field input__field--chisato ${
                  this.state.activeInput === 'alcohol' || this.state.alcohol.length ? 'active' : ''
                }`}
                type="text"
                id="input-13"
                name="alcohol"
                autoComplete="off"
                onChange={this.handleIngredients('alcohol')}
                onKeyDown={onKeyDown}
                // onChange={this.handleIngredients('alcohol')}
                value={this.state.alcohol}
                // value={userInput}
                onFocus={e => this.setState({ activeInput: 'alcohol' })}
                required
              />
              <label className="input__label input__label--chisato">
                <span className="input__label-content input__label-content--chisato" data-content="Alcohol">
                  Alcohol
                </span>
              </label>
              {activeInput === 'alcohol' && this.renderSuggestedInputs()}
            </span>
            <span className="input input--chisato">
              <input
                className={`input__field input__field--chisato ${
                  this.state.activeInput === 'mixer' || this.state.mixer.length ? 'active' : ''
                }`}
                type="text"
                name="mixer"
                autoComplete="off"
                // onChange={this.handleIngredients('mixer')}
                value={this.state.mixer}
                onChange={this.handleIngredients('mixer')}
                onKeyDown={onKeyDown}
                // value={userInput}
                onFocus={e => this.setState({ activeInput: 'mixer' })}
                required
              />
              <label className="input__label input__label--chisato">
                <span className="input__label-content input__label-content--chisato" data-content="Mixer">
                  Mixer
                </span>
              </label>
              {activeInput === 'mixer' && this.renderSuggestedInputs()}
            </span>
            <span className="input input--chisato">
              <input
                className={`input__field input__field--chisato ${
                  this.state.activeInput === 'garnish' || this.state.garnish.length ? 'active' : ''
                }`}
                type="text"
                id="input-13"
                name="garnish"
                autoComplete="off"
                onChange={this.handleIngredients('garnish')}
                value={this.state.garnish}
                onFocus={e => this.setState({ activeInput: 'garnish' })}
              />
              <label className="input__label input__label--chisato">
                <span className="input__label-content input__label-content--chisato" data-content="Garnish">
                  Garnish (Optional)
                </span>
              </label>
              {activeInput === 'garnish' && this.renderSuggestedInputs()}
            </span>
          </section>
          <div className="submit">
            <button type="submit">Drink!</button>
          </div>
        </form>
      </div>
    ); // end of return
  } // end of render
} // end of class
// no reason
export default SearchDrinks;
