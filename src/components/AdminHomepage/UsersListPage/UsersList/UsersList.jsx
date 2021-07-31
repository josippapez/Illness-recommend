import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Table } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import ListHeader from '../../../SharedComponents/ListHeader/ListHeader';
import '../../../../styles/ListTable.scss';
import { userInfoFetched } from '../../../../store/actions/usersActions';

const UsersList = props => {
  const currentUser = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [headers, setHeaders] = useState([
    {
      header: 'Ime i prezime',
      headerKey: 'name',
    },
    {
      header: 'Email',
      headerKey: 'email',
    },
    {
      header: 'Rola',
      headerKey: 'role',
    },
    {
      header: 'Akcije',
    },
  ]);
  return (
    <table style={{ width: '100%' }} className="list-table">
      <ListHeader setHeaders={setHeaders} headers={headers} />
      <tbody className="list-table__item-row">
        {props.usersList.map(user => {
          return (
            user.id !== currentUser.id && (
              <tr className="spacer  item-row" key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    id="link-to-student-page"
                    onClick={() => {
                      dispatch(userInfoFetched({ data: null }));
                      props.setUserId(user.id);
                      props.setShowUserInfoModal(true);
                    }}
                  >
                    Odaberi
                  </button>
                </td>
              </tr>
            )
          );
        })}
      </tbody>
    </table>
  );
};

UsersList.propTypes = {
  usersList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  setUserId: PropTypes.func,
  setShowUserInfoModal: PropTypes.func,
};

export default UsersList;
