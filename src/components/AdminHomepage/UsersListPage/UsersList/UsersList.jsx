import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Table } from 'reactstrap';
import { useSelector } from 'react-redux';
import ListHeader from '../../../SharedComponents/ListHeader/ListHeader';
import '../../../../styles/ListTable.scss';

const UsersList = props => {
  const currentUser = useSelector(state => state.user);
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
                      /* if (student.id !== studentSelected?.id) {
                        dispatch(certificateOfEmploymentFetched(null));
                        if (student.studyType === "IZVANREDNI") {
                          dispatch(
                            fetchCertificateOfEmploymentProfessor(student.id)
                          );
                        }
                        dispatch(startLoading());
                        dispatch(fetchStudentInfo(student.id));
                        dispatch(fetchInternshipStudentProfessor(student.id));
                      }
                      history?.push("/student-homepage"); */
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
};

export default UsersList;
