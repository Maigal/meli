import React from 'react';
import Product from './Product';

import { validProductDetails, validProductDetails2, emptyProductDetails } from '../../__mocks__/productDetails';
import { getFormattedPrice } from '../../helpers'; 

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

const validItem = validProductDetails.item;
const validItem2 = validProductDetails2.item
const invalidItem = emptyProductDetails.item;

describe('Product component', () => {

  it('Renders the correct values - mock 1', () => {
    const wrapper = shallow (<Product item={validItem} />);
    expect(wrapper.find('img.product__image').prop("src")).toBe('http://mla-s2-p.mlstatic.com/915468-MLA31356410443_072019-O.jpg')
    expect(wrapper.find('.product__description p').text()).toBe('Descripcion de prueba')
    expect(wrapper.find('.product__status').text()).toBe('Nuevo - 50 vendidos')
    expect(wrapper.find('.product__title').text()).toBe('Producto de prueba')
    expect(wrapper.find('.product__amount').text()).toBe('$ 2.500')
    expect(wrapper.find('.product__decimals').text()).toBe('82')
  })

  it('Renders the correct values - mock 2', () => {
    const wrapper = shallow (<Product item={validItem2} />);
    expect(wrapper.find('img.product__image').prop("src")).toBe('http://mla-s2-p.mlstatic.com/915468-MLA31356410443_072019-O.jpg')
    expect(wrapper.find('.product__description p').text()).toBe('Descripcion de prueba 2')
    expect(wrapper.find('.product__status').text()).toBe('Usado - 0 vendidos')
    expect(wrapper.find('.product__title').text()).toBe('Producto de prueba 2')
    expect(wrapper.find('.product__amount').text()).toBe('$ 200')
    expect(wrapper.find('.product__decimals').text()).toBe('00')
  })

  it('Renders an error message if item is empty', () => {
    const wrapper = shallow (<Product item={invalidItem} />);
    expect(wrapper.find('p').text()).toBe('Invalid product ID.')
  })

})

