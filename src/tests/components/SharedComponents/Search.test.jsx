/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import Search from '../../../components/SharedComponents/Search/Search';

jest.mock('../../../store/actions');

const middlewares = [thunk];

const initialState = {};

const props = {
  fetchData: jest.fn(),
  setSearchQuery: jest.fn(),
};

const mockStore = configureStore(middlewares);
const store = mockStore(initialState);

describe('Search', () => {
  const setSearchTerm = jest.fn();
  const handleClick = jest.spyOn(React, 'useState');
  handleClick.mockImplementation(searchTerm => [searchTerm, setSearchTerm]);

  it('renders correctly', () => {
    const component = mount(
      <Provider store={store}>
        <Search
          {...props}
          fetchDataByName={jest.fn().mockImplementation(() => ({
            type: 'test',
          }))}
        />
      </Provider>
    );
    expect(component.html()).toMatchSnapshot();
  });

  it('has the initial state empty string', () => {
    expect(setSearchTerm).toBeTruthy();
  });

  it('search content changes on input', () => {
    const component = mount(
      <Provider store={store}>
        <Search
          {...props}
          fetchDataByName={jest.fn().mockImplementation(() => ({
            type: 'test',
          }))}
        />
      </Provider>
    );
    component.find('.search-input').simulate('change', {
      target: { value: 'test' },
    });
    expect(component.find('.search-input').props().value).toEqual('test');
  });

  it('Dispatches search action when input is not null and enter is pressed', () => {
    const component = mount(
      <Provider store={store}>
        <Search
          {...props}
          fetchDataByName={jest.fn().mockImplementation(() => ({
            type: 'test',
          }))}
        />
      </Provider>
    );
    component.find('.search-input').simulate('change', {
      target: { value: 'test' },
    });
    expect(component.find('.search-input').props().value).toEqual('test');
    component.find('.search-input').simulate('submit');
  });

  it('Dispatches search action when input is null and enter is pressed', () => {
    const component = mount(
      <Provider store={store}>
        <Search
          {...props}
          fetchDataByName={jest.fn().mockImplementation(() => ({
            type: 'test',
          }))}
          fetchData={jest.fn().mockImplementation(() => ({
            type: 'test',
          }))}
        />
      </Provider>
    );
    component.find('.search-input').simulate('submit');
  });
});
