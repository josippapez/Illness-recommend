/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Navbar from '../../../components/SharedComponents/Navbar/Navbar';

jest.mock('../../../store/actions');

const initialState = {
  theme: {
    darkTheme: false,
  },
  user: {
    id: 1,
    name: 'Anno Anno',
    email: 'test@tt.com',
    role: 'user',
    isAuthenticated: true,
    error: null,
    status: null,
    message: null,
  },
  patient: {
    currentPatientInfo: {
      id: 6,
      created: '2021-08-24T13:15:31.363Z',
      oib: '4657',
      name: 'test',
      age: 77,
      weight: 66,
      pregnantOrBreastFeed: true,
      symptomsSelected: [],
      medicationsSelected: [],
      alergies: [
        {
          id: 1,
          name: 'Amikacin',
        },
      ],
    },
    viewingPatientInfo: null,
    error: null,
    status: null,
    message: null,
    patientList: null,
  },
};

const mockStore = configureStore();
const store = mockStore(initialState);

describe('Navbar', () => {
  let component;

  const history = createMemoryHistory();

  it('renders correctly', () => {
    component = mount(
      <Provider store={store}>
        <Router history={history}>
          <Navbar />
        </Router>
      </Provider>
    );
    expect(component.html()).toMatchSnapshot();
  });
});
