const express = require('express');
const app = express();
const request = require('request');

app.get('/api/customers', (req, res) => {
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Brad', lastName: 'Traversy'},
    {id: 3, firstName: 'Mary', lastName: 'Swanson'},
  ];

  res.json(customers);
});

app.get('/api/items', (req, res) => {
  const query = (req.query && req.query.q)? req.query.q : '';
  
  request('https://api.mercadolibre.com/sites/MLA/search?q=' + query, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      const results = JSON.parse(body).results;
      const items = results.map(function(result, index) {
        return {
          id: result.id,
          title: result.title,
          price: {
            currency: result.currency_id,
            amount: parseFloat(result.price),
            // decimals: parseInt(result.id),
          },
          picture: result.thumbnail,
          condition: result.condition,
          free_shipping: (result.shipping && result.shipping.free_shipping)? true : false,
          address: result.address.state_name
        }
      });

      const resp = {
        autor : {
          name: 'Enmanuel',
          lastname: 'Ruiz'
        },
        categories: [
          //category_id
        ],
        items: items
      };

      res.json(resp);
    } else {
      res.json([]);
    }
  });

});

app.get('/api/items/:id', (req, res) => {
  const id = (req.params && req.params.id)? req.params.id : '';
  
  request('https://api.mercadolibre.com/items/' + id, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      const item = JSON.parse(body);
      const resp = {
        author: {
          name: 'Enmanuel',
          lastname: 'Ruiz'
        },
        item: {
          id: item.id,
          title: item.title,
          price: {
            currency: item.currency_id,
            amount: parseFloat(item.price),
          },
          picture: (item.pictures && item.pictures.length > 0 && item.pictures[0].url)? item.pictures[0].url : '',
          condition: item.condition,
          free_shipping: (item.shipping && item.shipping.free_shipping)? true : false,
          sold_quantity: parseInt(item.sold_quantity),
          description: ''
        }
      };

      request('https://api.mercadolibre.com/items/' + id + '/description', function (error_, response_, body_) {
        if (!error_ && response_.statusCode == 200) {
          const description = JSON.parse(body_);
          resp.item.description = description.plain_text? description.plain_text : '';
          res.json(resp);
        } else {
          res.json(resp);
        }
      });
    } else {
      res.json([]);
    }
  });
});

const port = 5000;

app.listen(port, () => `Server running on port ${port}`);