const path = require('path');
const express = require('express');
const app = express();
const fetchSearchResult = require('./api/search'); 
const fetchProductDetails = require('./api/details'); 
const port = 5000;
const helpers = require('./helpers');


const author = {
  name: "Matias",
  lastname: "Almeida"
}

app.get('/api/items', async (req, res) => {
  const query = req.query;
  if (query.q) {
    let searchResult = await fetchSearchResult(query.q);
    let response;
    switch (searchResult.status) {
      case "SUCCESS":
        response = {
          author,
          categories: searchResult.categories.map(category => category.name),
          items: searchResult.items.map(item => helpers.formatProductListItem(item))
        }
        break;

      case "NO RESULTS": 
        response = {
          error: true,
          error_status: 404
        }
        break;
      
      case "ERROR":
        response = {
          error: true,
          error_status: searchResult.errorMessage
        }

      default:
        response = {
          error: true
        }
        break;
    }

    res.status(200).send(response)
  }
});

app.get('/api/items/:id', async (req, res) => {
  const paramId = req.params.id;
  let productDetails = await fetchProductDetails(paramId);
  let response;
  switch (productDetails.response_status) {
    case "SUCCESS":
      response = {
        author,
        item: helpers.formatProductDetail(productDetails)
      }
      break;

    case "NO RESULTS":
      response = {
        error: true,
        error_status: 404
      }
      break;

    case "ERROR":
      response = {
        error: true,
        error_message: productDetails.error_message
      }
      break;

    default:
      response = {
        error: true
      }
      break;
  }

  res.status(200).send(response)
})



app.use(express.static(__dirname + '/client/build/'))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client/build/', 'index.html'))
})


app.listen(port, () => `Server running on port ${port}`); 
