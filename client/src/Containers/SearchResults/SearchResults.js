import React, { setState, useEffect } from 'react';
import * as searchActions from '../../actions/searchActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Breadcrumbs from '../../Components/Breadcrumbs/Breadcrumbs';
import ProductList from '../../Components/ProductList/ProductList';
import LoadingContainer from '../../Components/LoadingContainer/LoadingContainer';


const SearchResults = ({cleanSearch, fetchStatus, currentSearch, submitSearch, fetchSearchResults, location, products, categories}) => {

  useEffect(() => {
    const param = new URLSearchParams(location.search).get('search')
    if (param && param !== currentSearch) {
      
      submitSearch(param)
    }
    return () => {
      cleanSearch()
    }
  }, []);

  useEffect(() => {
    if (currentSearch !== '') {
      fetchSearchResults(currentSearch)
      console.log('search desde results', currentSearch)
    }
  }, [currentSearch]);

  const renderContent = () => {
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


export default connect(mapStateToProps, searchActions)(withRouter(SearchResults));