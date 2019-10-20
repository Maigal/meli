import * as searchActions from './searchActions';

import { validSearchResults } from '../__mocks__/searchResults';



import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import fetchMock from 'fetch-mock'

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({ 
  fetchStatus: '',
  products: [],
  categories: [],
  currentSearch: ''
 })

describe('Search Actions', () => {

  beforeEach(() => { 
    store.clearActions()
  })

  afterEach(() => {
    fetchMock.restore()
  })


  it('Should set a new search string', () => {
    const query = 'pelota'
    const expectedAction = [{
      type: "SET_SEARCH_STRING",
      payload: query
    }]

    store.dispatch(searchActions.submitSearch(query))
    expect(store.getActions()).toEqual(expectedAction)
  })

  it('Should dispatch lean search', () => {
    const expectedAction = [{
      type: "CLEAN_SEARCH"
    }]

    store.dispatch(searchActions.cleanSearch())
    expect(store.getActions()).toEqual(expectedAction)
  })


  it('Fetches valid results given a valid search value', async () => {
    fetchMock.getOnce('*', {
      body: validSearchResults
    })

    const expectedActions = [
      { type: 'FETCH_PRODUCTS_START' },
      { type: 'FETCH_PRODUCTS_SUCCESS', payload: validSearchResults }
    ]

    await store.dispatch(searchActions.fetchSearchResults('prueba'))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('Fetches no results given an invalid search value', async () => {
    fetchMock.getOnce('*', {
      body: {
        error: true,
        error_status: 404
      }
    })

    const expectedActions = [
      { type: 'FETCH_PRODUCTS_START' },
      { type: 'FETCH_PRODUCTS_NO_RESULTS'}
    ]

    await store.dispatch(searchActions.fetchSearchResults('fsafsafsdsafsafas'))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('Dispatches an error message if requests fails', async () => {
    fetchMock.getOnce('*', {
      throws: 'mocked error in response - testing for errors'
    })

    const expectedActions = [
      { type: 'FETCH_PRODUCTS_START' },
      { type: 'FETCH_PRODUCTS_ERROR'}
    ]

    await store.dispatch(searchActions.fetchSearchResults('asd'))
    expect(store.getActions()).toEqual(expectedActions)
  })
})