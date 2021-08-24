/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';

import { loginError, loginUser, registerUser } from '../../../store/actions';
import Login from '../../../components/Login/Login';

jest.mock('../../../store/actions');

const initialState = {
  user: {
    userInfo: {
      data: null,
      error: null,
      status: null,
    },
    role: null,
    isAuthenticated: false,
    error: [
      {
        message: 'Polje je obavezno',
        field: 'email',
      },
      {
        message: 'Polje je obavezno',
        field: 'password',
      },
      {
        message: 'Polje je obavezno',
        field: 'name',
      },
      {
        message: 'Vrijednost nije pravilnog formata',
        field: 'name',
      },
    ],
    status: 400,
  },
  errorMessage: { message: 'Test' },
};

const mockStore = configureStore();
const store = mockStore(initialState);

describe('Login', () => {
  let component;
  delete window.location;

  beforeEach(() => {
    window.location = { replace: jest.fn() };
    Object.defineProperty(window.location, 'replace', {
      configurable: true,
    });
    window.location.replace = jest.fn();

    registerUser.mockImplementation(() => ({ type: 'test' }));
    loginUser.mockImplementation(() => ({ type: 'test' }));

    component = mount(
      <Provider store={store}>
        <Login />
      </Provider>
    );
  });

  it('renders correctly', () => {
    expect(component.html()).toMatchSnapshot();
  });

  it('it should show an error message if there is error', () => {
    window.location.replace('/login?message=error');
    jest.spyOn(URLSearchParams.prototype, 'get').mockImplementation(key => key);
    loginError.mockImplementation(message => ({
      type: 'TEST',
      payload: { message },
    }));
    const newComponent = mount(
      <Provider store={store}>
        <Login />
      </Provider>
    );
    expect(newComponent.find('.login__message')).toBeTruthy();
  });

  describe('form', () => {
    it('it should show a form when clicked on non-student login button', () => {
      const registerBtn = component.find(
        '.login__button-container__register-btn'
      );
      const form = component.find('.login__form');
      registerBtn.simulate('click');
      expect(form).toBeTruthy();
    });

    it('it should remove a form when clicked on return button', () => {
      loginError.mockImplementation(() => ({
        type: 'TEST',
      }));
      component
        .find('.login__button-container__register-btn')
        .simulate('click');
      component.find('.header__back').simulate('click');
      expect(loginError).toBeCalled();
    });

    it('email and password content changes on input', () => {
      component
        .find('.login__button-container__register-btn')
        .simulate('click');

      component.find('.content-container__name').simulate('change', {
        target: { value: 'test' },
      });
      component.find('.content-container__email').simulate('change', {
        target: { value: 'test' },
      });
      component.find('.content-container__password').simulate('change', {
        target: { value: 'test' },
      });
      component.find('.password-icon').simulate('click');
      expect(component.find('.content-container__name').props().value).toBe(
        'test'
      );
      expect(component.find('.content-container__email').props().value).toBe(
        'test'
      );
      expect(component.find('.content-container__password').props().value).toBe(
        'test'
      );
    });

    it('it should dispatch login user when login form button is clicked', () => {
      loginUser.mockImplementation((email, password) => ({
        type: 'TEST',
        payload: { email, password },
      }));
      loginError.mockImplementation(error => ({
        type: 'TEST',
        payload: error,
      }));
      component.find('.login__button-container__login-btn').simulate('click');
      component.find('.content-container__email').simulate('change', {
        target: { value: 'test' },
      });
      component.find('.content-container__password').simulate('change', {
        target: { value: 'test' },
      });
      component.find('form').simulate('submit');
      expect(loginUser).toBeCalled();
      component.unmount();
    });
  });
});
