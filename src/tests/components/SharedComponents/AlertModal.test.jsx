/* eslint-disable no-undef */
import React from 'react';
import { mount } from 'enzyme';
import AlertModal from '../../../components/SharedComponents/AlertModal/AlertModal';

const props = {
  alertInfotext: 'test',
  confirmOptions: jest.fn(),
  declineOptions: jest.fn(),
  showOnlyConfirmOption: false,
};

describe('Alert Modal', () => {
  let component;

  const modalRoot = global.document.createElement('div');
  modalRoot.setAttribute('id', 'root');
  const body = global.document.querySelector('body');
  body.appendChild(modalRoot);

  afterEach(() => {
    component.unmount();
  });

  it('Renders correctly', () => {
    component = mount(<AlertModal {...props} />);
    expect(component.html()).toMatchSnapshot();
  });
});
