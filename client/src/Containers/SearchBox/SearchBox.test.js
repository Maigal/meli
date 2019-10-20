import React, { useEffect } from 'react';
import { SearchBox } from './SearchBox';
import iconSearch from './../../assets/images/icon-search.svg';

import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

const props = {
  submitSearch: jest.fn(),
  currentSearch: 'test',
  history: {push: jest.fn()}
}



describe('SearchBox component', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Accepts text input', () => {
    const wrapper = shallow(<SearchBox {...props} />)
    wrapper.find('input').simulate('change', {target: {value: 'new test'}});
    expect(wrapper.find('input').props().value).toBe('new test')
  })

  it('Submits next value if it is different from the previous one', () => {
    const wrapper = shallow(<SearchBox {...props} />)
    wrapper.find('input').simulate('change', {target: {value: 'new test'}});
    wrapper.find('form').simulate('submit', { preventDefault: () => null })
    expect(props.submitSearch).toHaveBeenCalled()
    expect(props.history.push).toHaveBeenCalledWith('/items?search=new test')
  })

  it('Does not submit next value if it is equal to the previous one', () => {
    const wrapper = shallow(<SearchBox {...props} />)
    wrapper.find('input').simulate('change', {target: {value: 'test'}});
    wrapper.find('form').simulate('submit', { preventDefault: () => null })
    expect(props.submitSearch).not.toHaveBeenCalled();
    expect(props.history.push).not.toHaveBeenCalled();
  })

  it('Does not submit next value if text is empty', () => {
    const wrapper = shallow(<SearchBox {...props} />)
    wrapper.find('input').simulate('change', {target: {value: ''}});
    wrapper.find('form').simulate('submit', { preventDefault: () => null })
    expect(props.submitSearch).not.toHaveBeenCalled();
    expect(props.history.push).not.toHaveBeenCalled();
  })

  it('Renders the search icon correctly', () => {
    const wrapper = shallow(<SearchBox {...props} />)
    expect(wrapper.find('img').prop('src')).toEqual(iconSearch)
  })

})
