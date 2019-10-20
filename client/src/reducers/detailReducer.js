export const initialState = {
  fetchStatus: '',
  productDetails: null
}

const detailsReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'CLEAN_DETAILS':
      return {
        ...initialState
      }

    case 'FETCH_DETAILS_START':
      return {
        ...state,
        fetchStatus: 'STARTED',
        productDetails: null
      }

    case 'FETCH_DETAILS_NO_RESULTS':
      return {
        ...state,
        fetchStatus: 'FINISHED',
        productDetails: {}
      }

    case 'FETCH_DETAILS_ERROR':
      return {
        ...state,
        fetchStatus: 'ERROR',
        productDetails: {}
      }

    case 'FETCH_DETAILS_SUCCESS':
      return {
        ...state,
        fetchStatus: 'FINISHED',
        productDetails: action.payload.item
      }

    default:
      return state
  }
}

export default detailsReducer;