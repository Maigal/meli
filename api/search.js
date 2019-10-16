const fetch = require('node-fetch');

const SEARCH_URL = "https://api.mercadolibre.com/sites/MLA/search?q=:";
const CATEGORY_URL = "https://api.mercadolibre.com/categories/";


/**
 * Fetches search results
 * @param  {String} query Search query
 * @return {Array<Object>} Product list with their respective list of categories
*/

const fetchSearchResult = async function(query) {
  const url = SEARCH_URL + query;
  const searchResult = await fetch(url)
    .then(res => {
      if(res.status === 200) {
        return res.json();
      } else {
        throw new Error(res.status);
      }
      
    })
    .then(async res => {
      // Handling valid and empty search results
      if (res.results && res.results.length > 0) {
        // Getting the array of categories  from "available_filters -> category" and delegating all the logic to bring the final data to a helper function 
        // If the category filter doesn't exist, return an empty array
        let categories = [];
        if (res.available_filters.find(filter => filter.id === "category")) {
          categories = await getMostPopularCategoryData(res.available_filters.find(filter => filter.id === "category"))
        }

        return {
          status: "SUCCESS",
          items: res.results.slice(0,4),
          categories
        }
      } else {
        return {
          status: "NO RESULTS"
        }
      }
    })
    .catch(err => {
      return {
        status: "ERROR",
        errorStatus: 'Error' + err
      }
    })
  return searchResult;
}


/**
 * Fetches the breadcrumb data for the category with the highest result
 * @param  {Array<Object>} categories List of categories from the search result
 * @return {Array<Object>} List of elements for the breadcrumbs
*/

const getMostPopularCategoryData = async function(categories) {
  if (categories && categories.values) {
    // Getting the category with the most results
    const reducer = (acc, cur) => (acc.results > cur.results) ? acc : cur;
    const highestCategory = categories.values.reduce(reducer, {results: 0})
    // It wasnt 100% clear where to get this info from, but looking through the API docs i found the correct endpoint to get the breadcrumbs information, which is /categories/:id[path_from_root]
    const categoryData = await fetch(CATEGORY_URL + highestCategory.id)
      .then(res => res.json())
      .then(res => res.path_from_root);
    return categoryData;
  } else {
    return [];
  }
}

module.exports = fetchSearchResult;