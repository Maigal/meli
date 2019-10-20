import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as detailsActions from '../../actions/detailsActions';
import LoadingContainer from '../../Components/LoadingContainer/LoadingContainer';
import Breadcrumbs from '../../Components/Breadcrumbs/Breadcrumbs';
import Product from '../../Components/Product/Product';
import PropTypes from 'prop-types';

/**
 * Component that defines what to render based on the product detail request status.
 * @prop {Object} match Provides URL params detection
 * @prop {String} fetchStatus Status of the request
 * @prop {Object} details All the properties that the product details should render
 * @prop {Function} fetchDetails Action that fetches the product details for a given ID
 * @prop {Function} cleanDetails Cleanup action after component unmounts
*/

export const ProductDetails = ({match, fetchStatus, details, fetchDetails, cleanDetails}) =>  {

  useEffect(() => {
    // When the component mounts, get the url param and create an action that will fetch the data
    const idParam = match.params.id;
    fetchDetails(idParam);

    return () => {
      // Clean up this product from the store
      cleanDetails()
    }
  }, []);

  const renderContent = () => {
    // Selecting what to render based on the request status
    switch (fetchStatus) {

      case 'FINISHED':
        return (
          <main className="container">
            <Breadcrumbs data={details.categories} />
            <Product item={details} />
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
  fetchStatus: state.details.fetchStatus,
  details: state.details.productDetails
});

ProductDetails.propTypes = {
  match: PropTypes.object,
  fetchDetails: PropTypes.func,
  cleanDetails: PropTypes.func,
  fetchStatus: PropTypes.string,
  details: PropTypes.shape({
    categories: PropTypes.arrayOf(PropTypes.string),
    id: PropTypes.string,
    condition: PropTypes.string,
    description: PropTypes.string,
    free_shipping: PropTypes.bool,
    picture: PropTypes.string,
    price: PropTypes.shape({
      currency: PropTypes.string,
      amount: PropTypes.number,
      decimals: PropTypes.number
    }),
    sold_quantity: PropTypes.number,
    title: PropTypes.string
  }),
  fetchDetails: PropTypes.func,
  cleanDetails: PropTypes.func
}


export default connect(mapStateToProps, detailsActions)(withRouter(ProductDetails));
