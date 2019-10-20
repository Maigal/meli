import React from 'react';
import { ProductDetails } from './ProductDetails';

import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { validProductDetails } from '../../__mocks__/productDetails';

import Breadcrumbs from '../../Components/Breadcrumbs/Breadcrumbs';
import Product from '../../Components/Product/Product';
import LoadingContainer from '../../Components/LoadingContainer/LoadingContainer';



Enzyme.configure({ adapter: new Adapter() })

const props = {
  cleanDetails: jest.fn(),
  submitSearch: jest.fn(),
  fetchDetails: jest.fn(),
  match: {params: {id: 'MLA123'}}
}

describe('ProductDetails container', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Renders the correct components', () => {
    const wrapper = shallow(
      <ProductDetails {...props}
      fetchStatus="FINISHED" 
      details={validProductDetails.item} />,
    )

    expect(wrapper.find('.container').exists()).toBeTruthy();
    expect(wrapper.find(Breadcrumbs).exists()).toBeTruthy();
    expect(wrapper.find(Breadcrumbs).props().data).toEqual(validProductDetails.item.categories);
    expect(wrapper.find(Product).exists()).toBeTruthy();
    expect(wrapper.find(Product).props().item).toEqual(validProductDetails.item);
    expect(wrapper.find(LoadingContainer).exists()).toBeFalsy();
  })

  it('Renders the loading spinner while data is loading', () => {
    const wrapper = shallow(
      <ProductDetails {...props} 
      fetchStatus="STARTED" 
      />,
    )
    expect(wrapper.find(LoadingContainer).exists()).toBeTruthy();
    expect(wrapper.find(Breadcrumbs).exists()).toBeFalsy();
    expect(wrapper.find(Product).exists()).toBeFalsy();
  })

  it('Renders nothing if no fetch was not performed', () => {
    const wrapper = shallow(
      <ProductDetails {...props} 
      fetchStatus="" 
      />,
    )
    expect(wrapper.html()).toBe("");
  })

  it('Should call fetchDetails when mounting', () => {
    const wrapper = mount(
      <ProductDetails {...props} 
      fetchStatus="" 
      />,
    )

    expect(wrapper.props().fetchDetails).toHaveBeenCalledWith('MLA123');
  })

  it('Should clean up when unmounted', () => {

    const wrapper = mount(
      <ProductDetails {...props} 
        fetchStatus=""
      />,
    )

    wrapper.unmount();
    expect(props.cleanDetails).toHaveBeenCalled();
  })


})