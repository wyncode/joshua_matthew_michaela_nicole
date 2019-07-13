import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import MyDrink from './pages/Drink'
// import Drink from './pages/Drink'

const App = () => {
 return (
   <BrowserRouter>
      <Navbar/>
     <Route exact path="/" component={Home} />
     <Route exact path="/MyDrink" component={MyDrink} />
     {/* <Route exact path="/" component={Drink} /> */}
   </BrowserRouter>
 )

}

export default App