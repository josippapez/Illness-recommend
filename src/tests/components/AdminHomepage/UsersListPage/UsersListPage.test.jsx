/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';

import UsersList from '../../../../components/AdminHomepage/UsersListPage/UsersList/UsersList';
import {
  fetchUserInfoById,
  getAllAlergies,
  getAllUsers,
  searchUsersByText,
  userInfoFetched,
} from '../../../../store/actions';
import UsersListPage from '../../../../components/AdminHomepage/UsersListPage/UsersListPage';

jest.mock('../../../../store/actions');

const mockStore = configureStore();
const store = mockStore({
  user: {
    id: 4,
    name: 'Josip Papež',
    email: 'tt@tt.com',
    role: 'admin',
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
  usersList: {
    users: [
      {
        id: 1,
        email: 'test@tt.com',
        name: 'Anno Anno',
        role: 'user',
      },
      {
        id: 5,
        email: 'a@tt.com',
        name: 'Crona-Mante',
        role: 'user',
      },
    ],
    error: null,
    status: null,
  },
});

const props = {
  theme: {
    darkTheme: false,
  },
};

describe('Users list page', () => {
  let component;

  const modalRoot = global.document.createElement('div');
  modalRoot.setAttribute('id', 'root');
  const body = global.document.querySelector('body');
  body.appendChild(modalRoot);

  beforeEach(() => {
    getAllUsers.mockImplementation(() => ({ type: 'test' }));
    searchUsersByText.mockImplementation(() => ({ type: 'test' }));
    userInfoFetched.mockImplementation(() => ({ type: 'test' }));
    getAllAlergies.mockImplementation(() => ({ type: 'test' }));
    fetchUserInfoById.mockImplementation(() => ({ type: 'test' }));
    component = mount(
      <Provider store={store}>
        <UsersListPage {...props} />
      </Provider>
    );
  });

  it('renders correctly', () => {
    expect(component.html()).toMatchSnapshot();
  });

  it('modal opens on user select button', () => {
    component.find('#link-to-medication-page').first().simulate('click');
    expect(userInfoFetched).toHaveBeenCalled();
  });
});
