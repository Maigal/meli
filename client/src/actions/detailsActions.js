import { API_URL } from "../constants";


export const fetchDetails = (id) => dispatch => {
  const URL = `${API_URL}/items/${id}`;
  dispatch({
    type: "FETCH_DETAILS_START"
  })

  fetch(URL)
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
    .catch(error => 'Error ' + error);
}

export const cleanDetails = () => dispatch => {
  dispatch({
    type: "CLEAN_DETAILS"
  })
}