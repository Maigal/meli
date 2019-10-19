import React from 'react';
import './ProductCard.scss';
import { getFormattedPrice } from '../../../helpers';
import freeShippingIcon from '../../../assets/images/free-shipping.png';
import { Link } from 'react-router-dom';

export const ProductCard = ({data, history}) => {

  const {
    free_shipping,
    id,
    picture,
    price,
    title,
    state_name
  } = data;

  return (
    <Link to={`/items/${id}`} className="product-card">
        <div className="product-card__thumbnail">
          <img src={picture} alt=""/>
        </div>
        <div className="product-card__body">
          <div className="product-card__details">
            <div className="product-card__price">
              <span>$ {getFormattedPrice(price.amount)}</span>
              {free_shipping && <img style={{marginLeft: "10px"}} src={freeShippingIcon} alt="Envío gratis" />}
            </div>
            <div className="product-card__title">
              {title}
            </div>
          </div>
          <div className="product-card__location">
            {state_name}
          </div>
          
        </div>
    </Link>
  )
}

export default ProductCard;
