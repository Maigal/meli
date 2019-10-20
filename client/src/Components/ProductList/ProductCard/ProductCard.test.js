import React from 'react';
import ProductCard from './ProductCard';

import { validSearchResults } from '../../../__mocks__/searchResults';
import { MemoryRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { getFormattedPrice } from '../../../helpers';

import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

const validItem1 = validSearchResults.items[0];
const validItem2 = validSearchResults.items[1];

Enzyme.configure({ adapter: new Adapter() })

describe('ProductCard component', () => {

  it('Renders the correct values - item 1', () => {
    const wrapper = mount(<MemoryRouter><ProductCard data={validItem1} /></MemoryRouter>);
    expect(wrapper.find(Link).props().to).toBe('/items/MLA776948011');
    expect(wrapper.find('.product-card__thumbnail img').prop("src")).toBe('http://mla-s2-p.mlstatic.com/795247-MLA31024642011_062019-I.jpg');
    expect(wrapper.find('.product-card__price span').text()).toBe('$ 275')
    expect(wrapper.find('.product-card__free-shipping').exists()).toBeFalsy();
    expect(wrapper.find('.product-card__title').text()).toBe('Pelota Goma Espuma Colegial Tipo Macu Diametro 15cm')
    expect(wrapper.find('.product-card__location').text()).toBe('Capital Federal')
  })

  it('Renders the correct values - item 2', () => {
    const wrapper = mount(<MemoryRouter><ProductCard data={validItem2} /></MemoryRouter>);
    expect(wrapper.find(Link).props().to).toBe('/items/MLA718178613');
    expect(wrapper.find('.product-card__thumbnail img').prop("src")).toBe('http://mla-s2-p.mlstatic.com/810629-MLA32122674137_092019-I.jpg');
    expect(wrapper.find('.product-card__price span').text()).toBe('$ 1.399')
    expect(wrapper.find('.product-card__free-shipping').exists()).toBeTruthy();
    expect(wrapper.find('.product-card__title').text()).toBe('Pelota Futbol Cuero Número 5 Cocida Niño Mejor Precio')
    expect(wrapper.find('.product-card__location').text()).toBe('Buenos Aires')
  })

})
