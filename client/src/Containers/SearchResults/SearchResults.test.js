import React from 'react';
import { SearchResults } from './SearchResults';
import { validSearchResults, emptySearchResults } from '../../__mocks__/searchResults';

import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Breadcrumbs from '../../Components/Breadcrumbs/Breadcrumbs';
import ProductList from '../../Components/ProductList/ProductList';
import LoadingContainer from '../../Components/LoadingContainer/LoadingContainer';



Enzyme.configure({ adapter: new Adapter() })

const props = {
  cleanSearch: jest.fn(),
  submitSearch: jest.fn(),
  fetchSearchResults: jest.fn(),
  currentSearch: 'test',
  location: {search: 'test'}
}


describe('SearchResults container', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Renders the correct components', () => {
    const wrapper = shallow(
      <SearchResults {...props} 
      fetchStatus="FINISHED" 
      products={validSearchResults.items}
      categories={validSearchResults.categories}
      />,
    )
    expect(wrapper.find('.container').exists()).toBeTruthy();
    expect(wrapper.find(Breadcrumbs).exists()).toBeTruthy();
    expect(wrapper.find(Breadcrumbs).props().data).toEqual(validSearchResults.categories);
    expect(wrapper.find(ProductList).exists()).toBeTruthy();
    expect(wrapper.find(ProductList).props().products).toEqual(validSearchResults.items);
    expect(wrapper.find(ProductList).props().keyword).toEqual(props.currentSearch);
    expect(wrapper.find(LoadingContainer).exists()).toBeFalsy();
  })

  it('Renders the loading spinner while data is loading', () => {
    const wrapper = shallow(
      <SearchResults {...props} 
      fetchStatus="STARTED" 
      />,
    )
    expect(wrapper.find(LoadingContainer).exists()).toBeTruthy();
    expect(wrapper.find(Breadcrumbs).exists()).toBeFalsy();
    expect(wrapper.find(ProductList).exists()).toBeFalsy();
  })

  it('Renders nothing if no search was performed', () => {
    const wrapper = shallow(
      <SearchResults {...props} 
      fetchStatus="" 
      />,
    )
    expect(wrapper.html()).toBe("");
  })

  it('Should call fetchSearchResults when new currentSearch arrives', () => {
    const wrapper = mount(
      <SearchResults {...props} 
      fetchStatus="FINISHED" 
      currentSearch="test"
      />,
    )

    wrapper.setProps({currentSearch: 'changed'});
    wrapper.update();
    expect(wrapper.props().fetchSearchResults).toHaveBeenCalled();
  })

  it('Should clean up when unmounted', () => {

    const wrapper = mount(
      <SearchResults {...props} 
        fetchStatus=""
        currentSearch=""
      />,
    )

    wrapper.unmount();
    expect(props.cleanSearch).toHaveBeenCalled();
  })

})
