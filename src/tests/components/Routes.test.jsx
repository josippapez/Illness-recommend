/* eslint-disable no-undef */
import React from 'react';
import { Provider, useSelector } from 'react-redux';
import configureStore from 'redux-mock-store';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Routes from '../../components/Routes';
import { render } from '@testing-library/react';
import {
  getAllAlergies,
  getAllMedications,
  getAllPatientsForAdmin,
  getAllPatientsForUser,
  getAllSymptoms,
  getAllUsers,
} from '../../store/actions';
import { mount } from 'enzyme';

jest.mock('../../store/actions');

const userArray = [
  {
    id: 4,
    name: 'Josip Papež',
    email: 'tt@tt.com',
    role: 'admin',
    isAuthenticated: true,
    error: null,
    status: null,
    message: null,
  },
  {
    id: 1,
    name: 'Anno Anno',
    email: 'test@tt.com',
    role: 'user',
    isAuthenticated: true,
    error: null,
    status: null,
    message: null,
  },
  {
    accessToken: '123',
    refreshToken: '123',
    role: 'admin',
    isAuthenticated: false,
    error: null,
    status: null,
  },
];
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
/*
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useLayoutEffect: jest.requireActual('react').useEffect,
})); */

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

const mockStore = configureStore();
const store = mockStore({
  ...initialState,
  user: {
    id: 4,
    name: 'Josip Papež',
    email: 'tt@tt.com',
    role: 'admin',
    isAuthenticated: true,
    error: null,
    status: null,
    message: null,
  },
});

describe('Routes', () => {
  beforeEach(() => {
    const functionsArray = [
      getAllUsers,
      getAllMedications,
      getAllAlergies,
      getAllSymptoms,
      getAllPatientsForAdmin,
      getAllPatientsForUser,
    ];
    functionsArray.map(mockfunction => {
      mockfunction.mockImplementation(() => ({ type: 'test' }));
    });
  });

  const modalRoot = global.document.createElement('div');
  modalRoot.setAttribute('id', 'root');
  const body = global.document.querySelector('body');
  body.appendChild(modalRoot);

  afterEach(() => {
    useSelector.mockClear();
  });
  it('renders correctly', () => {
    useSelector.mockImplementation(callback => {
      return callback({
        ...initialState,
        user: {
          id: 4,
          name: 'Josip Papež',
          email: 'tt@tt.com',
          role: 'admin',
          isAuthenticated: true,
          error: null,
          status: null,
          message: null,
        },
      });
    });
    const history = createMemoryHistory();
    const component = mount(
      <Provider store={store}>
        <Router history={history}>
          <Routes />
        </Router>
      </Provider>
    );
    expect(component.html()).toMatchSnapshot();
  });

  it('renders correctly when user is authenticated', () => {
    useSelector.mockImplementation(callback => {
      return callback({
        ...initialState,
        user: {
          id: 4,
          name: 'Josip Papež',
          email: 'tt@tt.com',
          role: 'admin',
          isAuthenticated: true,
          error: null,
          status: null,
          message: null,
        },
      });
    });
    const history = createMemoryHistory();
    const newState = {
      user: {
        id: 4,
        name: 'Josip Papež',
        email: 'tt@tt.com',
        role: 'admin',
        isAuthenticated: true,
        error: null,
        status: null,
        message: null,
      },
    };
    const newStore = mockStore(newState);
    const newComponent = mount(
      <Provider store={newStore}>
        <Router history={history}>
          <Routes />
        </Router>
      </Provider>
    );
    expect(newComponent.html()).toMatchSnapshot();
    newComponent.unmount();
  });

  it('renders correctly when user selects routes', () => {
    const urlArray = [
      '/users',
      '/medications',
      '/patients-details-history',
      '/patient-details',
      '/medication-suggestion',
      '/',
    ];
    const history = createMemoryHistory();
    userArray.map(user => {
      const newMockStore = configureStore();
      const newMockStoreImplementation = newMockStore({
        ...initialState,
        user: user,
      });
      useSelector.mockImplementation(callback => {
        return callback({
          ...initialState,
          user: user,
        });
      });
      let newComponent = null;
      urlArray.map(url => {
        window.history.pushState({}, 'Test Title', url);
        history.push(url);
        newComponent = render(
          <Provider store={newMockStoreImplementation}>
            <Router history={history}>
              <Routes />
            </Router>
          </Provider>
        );
      });
      newComponent.unmount();
    });
  });

  it('renders correctly when patient is added by user', () => {
    useSelector.mockImplementation(callback => {
      return callback({
        ...initialState,
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
      });
    });

    let newComponent = null;
    const history = createMemoryHistory();
    const newMockStore = configureStore();
    const newMockStoreImplementation = newMockStore({
      ...initialState,
      patient: {
        currentPatientInfo: {
          id: 5,
          created: '2021-08-24T11:32:21.412Z',
          oib: '7767',
          name: 'test',
          age: 55,
          weight: 44,
          pregnantOrBreastFeed: true,
          symptomsSelected: [],
          medicationsSelected: [],
          alergies: [],
        },
        viewingPatientInfo: null,
        error: null,
        status: null,
        message: null,
        patientList: null,
      },
      user: {
        id: 4,
        name: 'Josip Papež',
        email: 'tt@tt.com',
        role: 'user',
        isAuthenticated: true,
        error: null,
        status: null,
        message: null,
      },
    });
    history.push('/medication-suggestion');
    newComponent = render(
      <Provider store={newMockStoreImplementation}>
        <Router history={history}>
          <Routes />
        </Router>
      </Provider>
    );
    history.push('/');
    newComponent.unmount();
  });
});
