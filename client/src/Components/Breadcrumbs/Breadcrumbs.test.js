import React from 'react';
import Breadcrumbs from './Breadcrumbs';

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() })

const validData = ['Grandparent', 'Parent', 'Child'];
const emptyData = [];
const invalidData = {}

describe('Breadcrumbs component', () => {

  it('Renders the correct amount of elements', ()=> {
    const wrapper = shallow (<Breadcrumbs data={validData} />);
    expect(wrapper.find('a')).toHaveLength(validData.length)
    expect(wrapper.find('span')).toHaveLength(validData.length - 1)
  })

  it('Renders correct values', () => {
    const wrapper = shallow (<Breadcrumbs data={validData} />);
    const a_list = wrapper.find('a');
    a_list.map((element, index) => {
      expect(element.text()).toBe(validData[index])
    })
  })

  it('Does not render an empty array', () => {
    const wrapper = shallow (<Breadcrumbs data={emptyData} />);
    expect(wrapper.html()).toBeNull();
  })

  it('Does not render invalid data', () => {
    const wrapper = shallow (<Breadcrumbs data={invalidData} />);
    expect(wrapper.html()).toBeNull();
  })

})