import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import MyDrink from './pages/Drink';
import RandomDrink from './pages/RandomDrink';

const App = () => {
  return (
    <BrowserRouter>
      <Route exact path="/random-drink" component={RandomDrink} />
      <Route exact path="/" component={Home} />
      <Route path="/MyDrink/:id" component={MyDrink} />
    </BrowserRouter>
  );
};

export default App;
