/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import DataDisplay from '../../../components/SharedComponents/DataDisplay/DataDisplay';

jest.mock('../../../store/actions');

const initialState = {};

const props = {
  dataHeader: 'test',
  data: undefined,
  url: null,
  urlName: null,
  headerBolded: true,
  dataSeparatorTopSpacing: 15,
  dynamicHeaderWidth: true,
  displayInColumn: true,
  separateDataFromHeader: true,
};

const mockStore = configureStore();
const store = mockStore(initialState);

describe('Data display', () => {
  let component;

  it('renders correctly', () => {
    component = mount(
      <Provider store={store}>
        <DataDisplay {...props} />
      </Provider>
    );
    expect(component.html()).toMatchSnapshot();
  });

  it('renders correctly when url prop is passed', () => {
    const mockProps = {
      dataHeader: 'test',
      data: undefined,
      url: 'test',
      urlName: null,
      headerBolded: true,
      dynamicHeaderWidth: true,
      displayInColumn: false,
      separateDataFromHeader: true,
    };
    component = mount(
      <Provider store={store}>
        <DataDisplay {...mockProps} />
      </Provider>
    );
    expect(component.html()).toMatchSnapshot();
  });

  it('renders correctly when data prop is passed', () => {
    const mockProps = {
      dataHeader: 'test',
      data: 'test',
      removeTopSeparatorForData: true,
      displayInColumn: true,
    };
    component = mount(
      <Provider store={store}>
        <DataDisplay {...mockProps} />
      </Provider>
    );
    expect(component.html()).toMatchSnapshot();
  });
});
