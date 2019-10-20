import { API_URL } from "../constants";
/**
 * Fetches the search results the requested keyword, and dispatches the correct action depending on the response
 * @param {String} query The keyword for the search
*/
export const fetchSearchResults = (query) => dispatch => {
  const URL = `${API_URL}/items?q=${query}`;
  dispatch({
    type: "FETCH_PRODUCTS_START"
  })

  return fetch(URL)
    .then(res => res.json())
    .then(res => {
      if (res.error && res.error_status === 404) {
        dispatch({
          type: "FETCH_PRODUCTS_NO_RESULTS"
        })
      } else {
        dispatch({
          type: "FETCH_PRODUCTS_SUCCESS",
          payload: res
        })
      }
      
    })
    .catch(error => {
      console.warn(error)
      dispatch({
        type: "FETCH_PRODUCTS_ERROR"
      })
    });
}

/**
 * Adds the last submitted query string to the store
 * @param {String} query The keyword to submit
*/
export const submitSearch = (query) => dispatch => {
  dispatch({
    type: "SET_SEARCH_STRING",
    payload: query
  })
}

/**
 * Returns the search reducer's state to the initial state
*/
export const cleanSearch = () => dispatch => {
  dispatch({
    type: "CLEAN_SEARCH"
  })
}