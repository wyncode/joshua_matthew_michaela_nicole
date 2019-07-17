import React from 'react';

class SearchDrinks extends React.Component {
  state = {
    alcohol: '',
    alcActive: 'false',
    mixer: '',
    mixActive: 'false',
    garnish: '',
    garActive: 'false'
  }; // declaring an empty state object

  // passes through the ingredient key which also passes through that event
  handleIngredients = ingredient => e => {
    // updating state to the ingredient key and the event targe value
    this.setState({ [ingredient]: e.target.value });
  };
  handleSubmit = event => {
    // prevents page from reloading
    event.preventDefault();
    // saving the ingredients into one variable
    const ingredients = [this.state.mixer, this.state.alcohol, this.state.garnish].join(',');
    console.log(ingredients);
    // feeding ingredients into the findDrinks function
    this.props.findDrinks(ingredients);
    // resetting the ingredients after submit
    this.setState({ alcohol: '', mixer: '', garnish: '' });
  };

  render() {
    console.log(this.props);
    return (
      <div id="search">
        <h1>search</h1>
        <form onSubmit={this.handleSubmit}>
          <section id="input-wrapper">
            <span className="input input--chisato">
              <input
                className={`input__field input__field--chisato ${
                  this.state.alcActive.active || this.state.alcohol.length ? 'active' : ''
                }`}
                type="text"
                id="input-13"
                name="alcohol"
                // type="search"
                autoComplete="off"
                onChange={this.handleIngredients('alcohol')}
                value={this.state.alcohol}
                pattern="{1,15}"
                onFocus={e => this.setState({ alcActive: true })}
                onBlur={e => this.setState({ alcActive: false })}
                required
              />

              <label className="input__label input__label--chisato">
                <span className="input__label-content input__label-content--chisato" data-content="Alcohol">
                  Alcohol
                </span>
              </label>
            </span>
            <span className="input input--chisato">
              <input
                className={`input__field input__field--chisato ${
                  this.state.mixActive.active || this.state.mixer.length ? 'active' : ''
                }`}
                type="text"
                id="input-13"
                name="mixer"
                // type="search"
                autoComplete="off"
                onChange={this.handleIngredients('mixer')}
                value={this.state.mixer}
                pattern="{1,15}"
                onFocus={e => this.setState({ mixActive: true })}
                onBlur={e => this.setState({ mixActive: false })}
                required
              />
              <label className="input__label input__label--chisato">
                <span className="input__label-content input__label-content--chisato" data-content="Mixer">
                  Mixer
                </span>
              </label>
            </span>
            <span className="input input--chisato">
              <input
                className={`input__field input__field--chisato ${
                  this.state.garActive.active || this.state.garnish.length ? 'active' : ''
                }`}
                type="text"
                id="input-13"
                name="garnish"
                autoComplete="off"
                onChange={this.handleIngredients('garnish')}
                value={this.state.garnish}
                pattern="{1,15}"
                onFocus={e => this.setState({ garActive: true })}
                onBlur={e => this.setState({ garActive: false })}
              />
              <label className="input__label input__label--chisato">
                <span className="input__label-content input__label-content--chisato" data-content="Garnish">
                  Garnish
                </span>
              </label>
            </span>
          </section>
          <div class="submit">
            <button type="submit">Drink!</button>
          </div>
        </form>
      </div>
    ); // end of return
  } // end of render
} // end of class
// no reason
export default SearchDrinks;
