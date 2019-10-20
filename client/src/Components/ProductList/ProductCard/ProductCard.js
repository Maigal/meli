import React from 'react';
import './ProductCard.scss';
import { getFormattedPrice } from '../../../helpers';
import freeShippingIcon from '../../../assets/images/free-shipping.png';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


/**
 * Component that renders a product card
 * @prop {Object} data All the properties that the product card should render
*/

export const ProductCard = ({data}) => {

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
              {free_shipping && <img className="product-card__free-shipping" style={{marginLeft: "10px"}} src={freeShippingIcon} alt="Envío gratis" />}
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

ProductCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    free_shipping: PropTypes.bool,
    picture: PropTypes.string,
    price: PropTypes.shape({
      currency: PropTypes.string,
      amount: PropTypes.number,
      decimals: PropTypes.number
    }),
    title: PropTypes.string,
    state_name: PropTypes.string,
  })
}

export default ProductCard;
