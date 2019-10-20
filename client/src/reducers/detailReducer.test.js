import detailsReducer, { initialState } from "./detailReducer";
import {validProductDetails} from "../__mocks__/productDetails";


describe('Details reducer', () => {
  it('Should return initial state', () => {
    expect(detailsReducer(undefined, {})).toEqual(initialState)
  })

  it('Should clean details', () => {
    expect(detailsReducer({
      fetchStatus: 'FINISHED',
      productDetails: validProductDetails.item
    },
     {
      type: 'CLEAN_DETAILS'
    })
    ).toEqual(initialState)
  })

  it('Should clean details and start a new search', () => {
    expect(detailsReducer({
      fetchStatus: 'FINISHED',
      productDetails: validProductDetails.item
    }, 
    {
      type: 'FETCH_DETAILS_START'
    })
    ).toEqual({
      fetchStatus: 'STARTED',
      productDetails: null
    })
  })

  it('Should store search results when finished', () => {
    expect(detailsReducer({
      fetchStatus: 'STARTED',
      productDetails: null
    }, 
    {
      type: 'FETCH_DETAILS_SUCCESS',
      payload: validProductDetails
    })
    ).toEqual({
      fetchStatus: 'FINISHED',
      productDetails: validProductDetails.item
    })
  })

  it('Should empty product details when no result is found', () => {
    expect(detailsReducer({
      fetchStatus: 'STARTED',
      productDetails: null
    }, 
    {
      type: 'FETCH_DETAILS_NO_RESULTS'
    })
    ).toEqual({
      fetchStatus: 'FINISHED',
      productDetails: {}
    })
  })

  it('Should empty product details and display ERROR when an error was found', () => {
    expect(detailsReducer({
      fetchStatus: 'STARTED',
      productDetails: null
    }, 
    {
      type: 'FETCH_DETAILS_ERROR'
    })
    ).toEqual({
      fetchStatus: 'ERROR',
      productDetails: {}
    })
  })

})