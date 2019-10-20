import React, { useEffect } from 'react';
import * as searchActions from '../../actions/searchActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Breadcrumbs from '../../Components/Breadcrumbs/Breadcrumbs';
import ProductList from '../../Components/ProductList/ProductList';
import LoadingContainer from '../../Components/LoadingContainer/LoadingContainer';
import PropTypes from 'prop-types'

/**
 * Component that renders a product card
 * @prop {Function} cleanSearch Clean up action to be called when component unmounts
 * @prop {String} fetchStatus Status of the products search request
 * @prop {String} currentSearch The current string being queried to fetch results
 * @prop {Function} submitSearch Action that submits the next search value
 * @prop {Function} fetchSearchResults Action that performs the actual search
 * @prop {Object} location Provides the current url location along with query params
 * @prop {Array<Object>} products List of products returned from the search
 * @prop {Array<String>} categories List of categories returned from the search
*/


export const SearchResults = ({cleanSearch, fetchStatus, currentSearch, submitSearch, fetchSearchResults, location, products, categories}) => {

  // When component mounts, check for the url param for the value of 'search' and create an action change the current search string
  useEffect(() => {
    const param = new URLSearchParams(location.search).get('search')
    if (param && param !== currentSearch) {
      
      submitSearch(param)
    }
    return () => {
      // Clean up when component unmounts
      cleanSearch()
    }
  }, []);

  // Whenever a new search string is received, create an action to get the new search results
  useEffect(() => {
    if (currentSearch !== '') {
      fetchSearchResults(currentSearch)
    }
  }, [currentSearch]);


  const renderContent = () => {
    // Selecting what to render based on the request status
    switch (fetchStatus) {
      case 'FINISHED':
        return (
          <main className="container">
            <Breadcrumbs data={categories} />
            <ProductList products={products} keyword={currentSearch} />
          </main>
        )
      
      case 'STARTED': 
          return (
            <LoadingContainer />
          )
      default:
        return null;
    }
  }

  return (
    <>
      {renderContent()}
    </>
    
  )
}

const mapStateToProps = state => ({
  fetchStatus: state.search.fetchStatus,
  currentSearch: state.search.currentSearch,
  products: state.search.products,
  categories: state.search.categories
});

SearchResults.propTypes = {
  cleanSearch: PropTypes.func,
  submitSearch: PropTypes.func,
  fetchSearchResults: PropTypes.func,
  location: PropTypes.object,
  fetchStatus: PropTypes.string,
  currentSearch: PropTypes.string,
  products: PropTypes.arrayOf(PropTypes.object),
  categories: PropTypes.arrayOf(PropTypes.string)
}



export default connect(mapStateToProps, searchActions)(withRouter(SearchResults));