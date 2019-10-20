import * as detailsActions from './detailsActions';

import { validProductDetails, emptyProductDetails } from '../__mocks__/ProductDetails';



import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import fetchMock from 'fetch-mock'

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({ 
  fetchStatus: '',
  productDetails: null
})

describe('Detail Actions', () => {

  beforeEach(() => { 
    store.clearActions()
  })

  afterEach(() => {
    fetchMock.restore()
  })


  it('Should dispatch clean details', () => {
    const expectedAction = [{
      type: "CLEAN_DETAILS"
    }]

    store.dispatch(detailsActions.cleanDetails())
    expect(store.getActions()).toEqual(expectedAction)
  })


  it('Fetches valid product details given an ID', async () => {
    fetchMock.getOnce('*', {
      body: validProductDetails
    })

    const expectedActions = [
      { type: 'FETCH_DETAILS_START' },
      { type: 'FETCH_DETAILS_SUCCESS', payload: validProductDetails }
    ]

    await store.dispatch(detailsActions.fetchDetails('MLA791346493'))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('Fetches no results given an invalid ID', async () => {
    fetchMock.getOnce('*', {
      body: {
        error: true,
        error_status: 404
      }
    })

    const expectedActions = [
      { type: 'FETCH_DETAILS_START' },
      { type: 'FETCH_DETAILS_NO_RESULTS'}
    ]

    await store.dispatch(detailsActions.fetchDetails('11111111111111111111'))
    expect(store.getActions()).toEqual(expectedActions)
  })

  it('Dispatches an error message if requests fails', async () => {
    fetchMock.getOnce('*', {
      throws: 'mocked error in response  - testing for errors'
    })

    const expectedActions = [
      { type: 'FETCH_DETAILS_START' },
      { type: 'FETCH_DETAILS_ERROR'}
    ]

    await store.dispatch(detailsActions.fetchDetails('asd'))
    expect(store.getActions()).toEqual(expectedActions)
  })
})