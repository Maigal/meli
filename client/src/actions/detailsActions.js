import { API_URL } from "../constants";

/**
 * Fetches the product details for the requested product, and dispatches the correct action depending on the response
 * @param {String} id The id of the product
*/
export const fetchDetails = (id) => dispatch => {
  const URL = `${API_URL}/items/${id}`;
  dispatch({
    type: "FETCH_DETAILS_START"
  })

  return fetch(URL)
    .then(res => res.json())
    .then(res => {
      if (res.error && res.error_status === 404) {
        dispatch({
          type: "FETCH_DETAILS_NO_RESULTS"
        })
      } else {
        dispatch({
          type: "FETCH_DETAILS_SUCCESS",
          payload: res
        })
      }
      
    })
    .catch(error => {
      console.warn(error)
      dispatch({
        type: "FETCH_DETAILS_ERROR"
      })
    });
}

/**
 * Returns the details reducer's state to the initial state
*/
export const cleanDetails = () => dispatch => {
  dispatch({
    type: "CLEAN_DETAILS"
  })
}