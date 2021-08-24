/* eslint-disable no-undef */
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';

import UsersList from '../../../../components/AdminHomepage/UsersListPage/UsersList/UsersList';
import { userInfoFetched } from '../../../../store/actions';

jest.mock('../../../../store/actions');

const props = {
  usersList: [
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
  setUserId: jest.fn(),
  setShowUserInfoModal: jest.fn(),
};

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
});

describe('Users list', () => {
  let component;
  beforeEach(() => {
    userInfoFetched.mockImplementation(() => ({ type: 'test' }));
    component = mount(
      <Provider store={store}>
        <UsersList {...props} />
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
