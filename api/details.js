const fetch = require('node-fetch');

const CATEGORY_URL = "https://api.mercadolibre.com/categories/"
const PRODUCT_URL = "https://api.mercadolibre.com/items/";

/**
 * Fetches product details
 * @param  {String} productId Id of the product to fetch
 * @return {Object} Product details along with its categories and description
*/

const fetchProductDetails = async function(productId) {

  const productInfo = await fetch(PRODUCT_URL + productId)
    .then(res => res.json())
    .then(res => {
      if (res.error && res.error === "not_found") {
        return {
          response_status: "NO RESULTS"
        }
      } else {
        return {
          ...res,
          response_status: "SUCCESS",
        }
      }
    })
    .catch(err => {
      return {
        response_status: "ERROR",
        error_message: err
      }
    })
  let productDescription;
  let productCategories;
  if (!productInfo.error) {
    // If the request was successful, fetch the description and categories for this product
    productDescription = await fetch(PRODUCT_URL + productId +  '/description').then(res => res.json()).then(res => res.plain_text) || '';
    productCategories = await fetch(CATEGORY_URL + productInfo.category_id).then(res => res.json()).then(res => res.path_from_root || []);
  }
  
  // Return an object containing all the info, along with the description and categories
  return {...productInfo, productDescription, productCategories}

}

module.exports = fetchProductDetails;