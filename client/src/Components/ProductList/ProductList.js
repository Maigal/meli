import React from 'react';
import './ProductList.scss';
import ProductCard from './ProductCard/ProductCard';

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

export default ProductList;