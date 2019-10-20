import searchReducer, {initialState} from "./searchReducer";
import {validSearchResults} from "../__mocks__/searchResults";


describe('Details reducer', () => {
  it('Should return initial state', () => {
    expect(searchReducer(undefined, {})).toEqual(initialState)
  })

  it('Should clean details', () => {
    expect(searchReducer({
      fetchStatus: 'FINISHED',
      products: validSearchResults.items,
      categories: validSearchResults.categories,
      currentSearch: 'test'
    },
     {
      type: 'CLEAN_SEARCH'
    })
    ).toEqual(initialState)
  })

  it('Should set a new search string', () => {
    expect(searchReducer({
      ...initialState
    },
    {
      type: 'SET_SEARCH_STRING',
      payload: 'TestString'
    })
    ).toEqual({
      ...initialState,
      currentSearch: 'TestString'
    })
  })

  it('Should clean search results and start a new search', () => {
    expect(searchReducer({
      fetchStatus: 'FINISHED',
      products: validSearchResults.items,
      categories: validSearchResults.categories,
      currentSearch: 'test'
    }, 
    {
      type: 'FETCH_PRODUCTS_START'
    })
    ).toEqual({
      fetchStatus: 'STARTED',
      products: [],
      categories: [],
      currentSearch: 'test'
    })
  })

  it('Should store search results and categories when finished', () => {
    expect(searchReducer({
      fetchStatus: 'STARTED',
      products: [],
      categories: [],
      currentSearch: 'test'
    }, 
    {
      type: 'FETCH_PRODUCTS_SUCCESS',
      payload: validSearchResults
    })
    ).toEqual({
      fetchStatus: 'FINISHED',
      products: validSearchResults.items,
      categories: validSearchResults.categories,
      currentSearch: 'test'
    })
  })

  it('Should empty search results and categorieswhen no result is found', () => {
    expect(searchReducer({
      fetchStatus: 'STARTED',
      products: [],
      categories: [],
      currentSearch: 'test'
    }, 
    {
      type: 'FETCH_PRODUCTS_NO_RESULTS'
    })
    ).toEqual({
      fetchStatus: 'FINISHED',
      products: [],
      categories: [],
      currentSearch: 'test'
    })
  })

  it('Should empty search results and display ERROR when an error was found', () => {
    expect(searchReducer({
      fetchStatus: 'STARTED',
      products: [],
      categories: [],
      currentSearch: 'test'
    }, 
    {
      type: 'FETCH_PRODUCTS_ERROR'
    })
    ).toEqual({
      fetchStatus: 'ERROR',
      products: [],
      categories: [],
      currentSearch: 'test'
    })
  })

})