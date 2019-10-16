import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as detailsActions from '../../actions/detailsActions';
import LoadingContainer from '../../Components/LoadingContainer/LoadingContainer';
import Breadcrumbs from '../../Components/Breadcrumbs/Breadcrumbs';
import Product from '../../Components/Product/Product';

const ProductDetails = ({match, fetchStatus, details, fetchDetails, cleanDetails}) =>  {

  useEffect(() => {
    const idParam = match.params.id;
    fetchDetails(idParam);

    return () => {
      cleanDetails()
    }
  }, []);

  const renderContent = () => {
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


export default connect(mapStateToProps, detailsActions)(withRouter(ProductDetails));
