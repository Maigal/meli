import React from 'react';
import './Product.scss';
import { getFormattedPrice } from '../../helpers';

const Product = ({item}) => {

  if (JSON.stringify(item) === '{}') {
    return (
      <p>Invalid product ID.</p>
    )
  }

  return (
    <div className="product">
      <div className="product__body">
        <img className="product__image" src={item.picture} alt={item.title}/>
        <div className="product__description">
          <h3>Descripción del producto</h3>
          <p>{item.description}</p>
        </div>
      </div>

      <div className="product__details">
        <div className="product__status">
          {item.condition === 'new' ? 'Nuevo' : 'Usado'} - {item.sold_quantity} vendidos
        </div>
        <h2 className="product__title">
          {item.title}
        </h2>
        <div className="product__price">
          <span>$ {getFormattedPrice(item.price.amount)}</span> <span className="product__decimals">{item.price.decimals != 0 ? item.price.decimals : '00'}</span>
        </div>
        <button className="product__button-buy-now">Comprar</button>
      </div>
    </div>
  )
}


export default Product;