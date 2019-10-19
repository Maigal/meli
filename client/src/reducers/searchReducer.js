const initialState = {
  fetchStatus: '',
  products: [],
  categories: [],
  currentSearch: ''
}

const searchReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'CLEAN_SEARCH':
      return initialState;

    case 'SET_SEARCH_STRING':
      return {
        ...state,
        currentSearch: action.payload
      }

    case 'FETCH_PRODUCTS_START':
      return {
        ...state,
        fetchStatus: 'STARTED',
        products: [],
        categories: []
      }

    case 'FETCH_PRODUCTS_NO_RESULTS':
      return {
        ...state,
        fetchStatus: 'FINISHED',
        products: [],
        categories: []
      }

    case 'FETCH_PRODUCTS_SUCCESS':
      return {
        ...state,
        fetchStatus: 'FINISHED',
        products: action.payload.items,
        categories: action.payload.categories
      }

    case 'FETCH_PRODUCTS':
      return {
        ...state
      }

    default:
      return state
  }
}

export default searchReducer;