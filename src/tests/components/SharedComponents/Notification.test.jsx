/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import Notification from '../../../components/SharedComponents/Notification/Notification';

const initState = {
  user: {
    id: 1,
    name: 'Anno Anno',
    email: 'test@tt.com',
    role: 'user',
    isAuthenticated: true,
    error: null,
    status: null,
    message: null,
    userInfo: {
      data: {
        id: null,
        name: null,
        email: null,
        role: null,
      },
      error: null,
      status: null,
    },
  },
  usersList: {
    users: null,
    error: null,
    status: null,
  },
  alergies: {
    alergies: [
      {
        id: 1,
        name: 'Amikacin',
      },
      {
        id: 2,
        name: 'Azitromicin',
      },
    ],
    error: null,
    status: null,
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
};
const mockStore = configureStore();
const store = mockStore({
  ...initState,
  patient: {
    currentPatientInfo: null,
    viewingPatientInfo: null,
    error: null,
    status: 400,
    message: 'Podaci ne uspješno spremljeni',
    patientList: null,
  },
});

describe('Notification', () => {
  let component;

  it('Renders correctly when no request successfuly finished', () => {
    component = mount(
      <Provider store={store}>
        <Notification />
      </Provider>
    );
    expect(component.html()).toMatchSnapshot();
  });

  it('Renders correctly when request successfuly finished', () => {
    const mockInitState = {
      ...initState,
      patient: {
        currentPatientInfo: null,
        viewingPatientInfo: null,
        error: null,
        status: 201,
        message: 'Podaci uspješno spremljeni',
        patientList: null,
      },
    };
    const mockMockStore = configureStore();
    const mockStore = mockMockStore(mockInitState);
    component = mount(
      <Provider store={mockStore}>
        <Notification />
      </Provider>
    );
    expect(component.html()).toMatchSnapshot();
  });

  it('Modal closes on close button click', () => {
    const mockInitState = {
      ...initState,
      patient: {
        currentPatientInfo: null,
        viewingPatientInfo: null,
        error: null,
        status: 201,
        message: 'Podaci uspješno spremljeni',
        patientList: null,
      },
    };
    const mockMockStore = configureStore();
    const mockStore = mockMockStore(mockInitState);
    component = mount(
      <Provider store={mockStore}>
        <Notification />
      </Provider>
    );
    component.find('.Toastify').simulate('click');
    expect(component.html()).toMatchSnapshot();
  });
});
