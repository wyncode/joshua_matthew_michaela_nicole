import React from 'react'
import './App.css'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './pages/Home'
// import Drink from './pages/Drink'

const App = () => {
 return (
   <BrowserRouter>
     <Route exact path="/" component={Home} />
     {/* <Route exact path="/" component={Drink} /> */}
   </BrowserRouter>
 )
}

export default App