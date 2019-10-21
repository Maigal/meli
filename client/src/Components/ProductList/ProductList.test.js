import React from 'react';
import ProductList from './ProductList';
import ProductCard from './ProductCard/ProductCard';


import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

const fullList = [{id: '0'}, {id: '1'}, {id: '2'}, {id: '3'}];
const halfList = [{id: '0'}, {id: '1'}];


describe('ProductList component', () => {

  it('Should render the correct amount of cards', () => {
    const wrapper = shallow(<ProductList products={fullList} keyword={'test'} />)
    const wrapperHalf = shallow(<ProductList products={halfList} keyword={'test'} />)

    expect(wrapper.find('.product-list').exists()).toBeTruthy();
    expect(wrapper.find(ProductCard).length).toBe(4);

    expect(wrapperHalf.find('.product-list').exists()).toBeTruthy();
    expect(wrapperHalf.find(ProductCard).length).toBe(2);
    
  })

});