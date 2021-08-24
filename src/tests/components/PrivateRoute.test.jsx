/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import PrivateRoute from '../../components/PrivateRoute';
import { BrowserRouter } from 'react-router-dom';
import { waitFor } from '@testing-library/react';

import { refreshAuthentication } from '../../interceptor';
jest.mock('../../interceptor.jsx');

const initialState = {
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
    symptoms: [
      {
        id: 1,
        name: 'Akutna i teška abdominalna bol',
      },
      {
        id: 2,
        name: 'Blagi proljev',
      },
    ],
    error: null,
    status: null,
  },
  theme: {
    darkTheme: false,
  },
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
    patientList: [
      {
        id: 4,
        created: '2021-08-24T10:49:59.347Z',
        oib: '56756',
        name: 'tdhhd',
        age: 58567,
        weight: 56756,
        pregnantOrBreastFeed: true,
        symptomsSelected: [],
        medicationsSelected: [],
        alergies: [],
      },
      {
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
    ],
  },
};

const mockStore = configureStore();
const store = mockStore(initialState);

describe('Private route', () => {
  let component;
  let assignMock = jest.fn();
  let replaceMock = jest.fn();

  delete window.location;
  window.location = { assign: assignMock, replace: replaceMock };

  afterEach(() => {
    refreshAuthentication.mockReset();
    component.unmount();
    assignMock.mockClear();
  });

  test('renders correctly when there is no access token', async () => {
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value:
        'Refreshtoken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYyOTgwNzI5MCwiZXhwIjoxNzI5ODA3Mjg5fQ.uOavIEkI6bXXkhnKH5gFxQFtrlmyPyhAz-yJU-4Hkm8',
    });
    component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <PrivateRoute />
        </BrowserRouter>
      </Provider>
    );
    await waitFor(() => expect(component.html()).toMatchSnapshot());
  });

  it('renders correctly when refresh token expires', async () => {
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value:
        'Accesstoken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYyOTgwNzQzMCwiZXhwIjoxNjI5ODA3NDMxfQ.JeVQXCnV67Zhx1c74XY9f4lVprOZE5eCDA0bdAO8beI; Refreshtoken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYyOTgxMjgxOSwiZXhwIjoxNjI5ODEyODIwfQ.yDLuduUzgq3kCOE5gvmxgWuVARyPSuJqehcGcdi2Db4',
    });
    component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <PrivateRoute />
        </BrowserRouter>
      </Provider>
    );
    await waitFor(() => expect(component.html()).toMatchSnapshot());
  });

  it('renders correctly when token is valid', async () => {
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value:
        'Accesstoken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYyOTgwNzI5MCwiZXhwIjoxNzI5ODA3Mjg5fQ.T01vT85BlgdUhyMnOgp5mxS6zBBAwgxhEmpWLRJtK0s; Refreshtoken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYyOTgwNzI5MCwiZXhwIjoxNzI5ODA3Mjg5fQ.uOavIEkI6bXXkhnKH5gFxQFtrlmyPyhAz-yJU-4Hkm8',
    });
    component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <PrivateRoute />
        </BrowserRouter>
      </Provider>
    );
    await waitFor(() => expect(component.html()).toMatchSnapshot());
  });

  it('renders correctly when access token is expired and token is refreshed', async () => {
    refreshAuthentication.mockImplementationOnce(() => {
      Object.defineProperty(window.document, 'cookie', {
        writable: true,
        value:
          'Accesstoken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYyOTgwNzI5MCwiZXhwIjoxNzI5ODA3Mjg5fQ.T01vT85BlgdUhyMnOgp5mxS6zBBAwgxhEmpWLRJtK0s; Refreshtoken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYyOTgwNzI5MCwiZXhwIjoxNzI5ODA3Mjg5fQ.uOavIEkI6bXXkhnKH5gFxQFtrlmyPyhAz-yJU-4Hkm8',
      });
      return { status: 200 };
    });
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value:
        'Accesstoken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYyOTgxMjkwMCwiZXhwIjoxNjI5ODEyOTAxfQ.cHUdkVQxqqGYFEjUH2x6opHv11cAwR031iMGUPzlh30; Refreshtoken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYyOTgxMjg5OSwiZXhwIjoxNjM5ODEyODk4fQ.HkEsRxz91NN8bpvmnwP5FQQTcaQa7eL3IJzH6deNues',
    });
    component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <PrivateRoute />
        </BrowserRouter>
      </Provider>
    );
    await waitFor(() => expect(component.html()).toMatchSnapshot());
  });

  it('refresh access token call fails', async () => {
    refreshAuthentication.mockImplementationOnce(() => {
      return { status: 400 };
    });
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value:
        'Accesstoken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYyOTgwNzM4MywiZXhwIjoxNjI5ODA3Mzg0fQ.8aNfWw-Wi__0BUHWehZXeX5d3m24W2xSyZXQz9ILePE; Refreshtoken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYyOTgwNzM4MywiZXhwIjoxNjM5ODA3MzgyfQ.mIh8l5zekaRaG14rJK9463wPmPrZaBly4qvmZ2TWW8E',
    });
    component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <PrivateRoute />
        </BrowserRouter>
      </Provider>
    );
    await waitFor(() => expect(component.html()).toMatchSnapshot());
  });

  it('refresh access token returns expired access token', async () => {
    refreshAuthentication.mockImplementationOnce(() => {
      return { status: 200 };
    });
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value:
        'Accesstoken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYyOTgwNzM4MywiZXhwIjoxNjI5ODA3Mzg0fQ.8aNfWw-Wi__0BUHWehZXeX5d3m24W2xSyZXQz9ILePE; Refreshtoken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTYyOTgwNzM4MywiZXhwIjoxNjM5ODA3MzgyfQ.mIh8l5zekaRaG14rJK9463wPmPrZaBly4qvmZ2TWW8E',
    });
    component = mount(
      <Provider store={store}>
        <BrowserRouter>
          <PrivateRoute />
        </BrowserRouter>
      </Provider>
    );
    await waitFor(() => expect(component.html()).toMatchSnapshot());
  });
});
