//Test that children are rendered and that submit works recursively
import React from 'react';
import Form from '../form';
import { shallow } from 'enzyme';

test('Children are rendered correctly with submit', () => {
  const wrapper = shallow(
    <Form>
      <div className="parent">
        <div className="sub-parent">
          <div submit className="child" />
        </div>
      </div>
    </Form>
  );
  expect(wrapper.find('.parent')).toHaveLength(1);
  expect(wrapper.find('.sub-parent')).toHaveLength(1);
  expect(typeof wrapper.find('.child').props().onClick).toEqual('function');
});

test('Children are rendered correctly with null child', () => {
  const wrapper = shallow(
    <Form>
      <div className="parent">
        <div className="sub-parent">
          <div submit className="child" />
        </div>
      </div>
      {null}
    </Form>
  );
  expect(wrapper.find('.parent')).toHaveLength(1);
  expect(wrapper.find('.sub-parent')).toHaveLength(1);
  expect(typeof wrapper.find('.child').props().onClick).toEqual('function');
});
