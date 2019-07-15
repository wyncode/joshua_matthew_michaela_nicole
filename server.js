const axios = require('axios');
const express = require('express');
const path = require('path');
const app = express();

if (process.env.NODE_ENV !== 'DEVELOPMENT') {
  require('dotenv').config();
}

app.get(`/drinks/:item`, (request, response) => {
  axios
    .get(`https://www.thecocktaildb.com/api/json/v2/${process.env.API_KEY}/filter.php?i=${request.params.item}`)
    .then(cocktailResponse => {
      console.log('cocktail response', cocktailResponse);
      response.json(cocktailResponse.data || []);
    });
});

app.get('/random-drink', (request, response) => {
  axios
    .get(`https://www.thecocktaildb.com/api/json/v2/${process.env.API_KEY}/random.php`)
    .then(cocktailResponse => response.json(cocktailResponse.data));
});


app.get('/pages/Drink/:id', (request, response) => {
  axios.get(`https://www.thecocktaildb.com/api/json/v1/1/${process.env.API_KEY}&i=${request.params.id}`)
    .then(cocktailResponse => response.json(cocktailResponse.data)) 
})





if (process.env.NODE_ENV === 'DEVELOPMENT') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`API listening on port ${port}...`);
});
