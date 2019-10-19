import React from 'react';
import './ProductList.scss';
import ProductCard from './ProductCard/ProductCard';
import PropTypes from 'prop-types';

/**
 * Component that renders a list of product cards
 * @prop {Array<Object>} product List of products
 * @prop {String} keyword Search keyword to display in case of invalid results.
*/

const ProductList = ({products, keyword}) => {

  if (products && products.length > 0) {
    return (
      <div className="product-list">
        {
          products.map(product => (
            <ProductCard key={product.id} data={product} />
          ))
        }
      </div>
    )
  }

  return (
    <p>No se encontraron resultados para la búsqueda{keyword ? <strong> {keyword}</strong> : null}.</p>
  );
  
}

ProductList.propTypes = {
  product: PropTypes.arrayOf(PropTypes.object),
  keyword: PropTypes.string
}

export default ProductList;