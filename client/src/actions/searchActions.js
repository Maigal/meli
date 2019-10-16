import { API_URL } from "../constants"

export const fetchSearchResults = (query) => dispatch => {
  const URL = `${API_URL}/items?q=${query}`;
  dispatch({
    type: "FETCH_PRODUCTS_START"
  })

  fetch(URL)
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
    .catch(error => 'Error ' + error);
}

export const submitSearch = (query) => dispatch => {
  dispatch({
    type: "SET_SEARCH_STRING",
    payload: query
  })
}

export const cleanSearch = () => dispatch => {
  dispatch({
    type: "CLEAN_SEARCH"
  })
}