import React from 'react'
import './App.css'
import Home from './pages/Home'

class App extends React.Component {
  state = { serverMessage: '' }

  componentDidMount(){
    fetch('/api/demo')
      .then(response => response.json())
      .then(data => this.setState({ serverMessage: data.message }))
  }

  render(){
    return (
      <div id="demo">
        <Home/>
      </div>
    )
  }
}

export default App
