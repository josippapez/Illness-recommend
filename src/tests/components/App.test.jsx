/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { shallow } from 'enzyme';

import App from '../../components/App';

const initialState = {
  user: {
    userInfo: {
      data: null,
      error: null,
      status: null,
    },
    role: null,
    isAuthenticated: false,
    error: null,
    status: null,
    message: null,
  },
  usersList: {
    users: null,
    error: null,
    status: null,
  },
  alergies: {
    alergies: null,
    error: null,
    status: null,
    message: null,
  },
  medicationList: {
    medicationInfo: {
      data: null,
      error: null,
      status: null,
    },
    medications: null,
    error: null,
    status: null,
  },
  symptoms: {
    symptoms: null,
    error: null,
    status: null,
    message: null,
  },
  theme: {
    darkTheme: false,
  },
  patient: {
    currentPatientInfo: null,
    viewingPatientInfo: null,
    error: null,
    status: null,
    message: null,
    patientList: null,
  },
};

const mockStore = configureStore();
const store = mockStore(initialState);

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useLayoutEffect: jest.requireActual('react').useEffect,
}));

const component = shallow(
  <Provider store={store}>
    <App />
  </Provider>
);

describe('App', () => {
  it('renders correctly', () => {
    expect(component.html()).toMatchSnapshot();
  });
});
