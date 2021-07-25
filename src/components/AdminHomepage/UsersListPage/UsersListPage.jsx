import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './UsersListPage.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../../store/actions/usersActions';
import DataDisplay from '../../SharedComponents/DataDisplay/DataDisplay';
import UsersList from './UsersList/UsersList';

const UsersListPage = props => {
  const dispatch = useDispatch();
  const usersList = useSelector(state => state.usersList);
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <div>
      <DataDisplay
        dataHeader="Popis korisnika"
        headerBolded
        headerFontSize={23}
        headerTextColor={'#005BA7'}
        dataFullWidth
        TopSpacing={30}
        /* data={
            <div className='student-list-page__list__search'>
              {selectedSubject !== 'Odaberi predmet' && (
                <Search
                  searchingByInfo='*Pretraživanje po Imenu, Emailu, JMBAG i Telefonu'
                  fetchData={() => {
                    return getStudentForSubjectbyQuery(
                      null,
                      selectedStatuses,
                      selectedStudyType,
                      startDate
                        ? moment(startDate)
                          .startOf('day')
                          .format('YYYY-MM-DD HH:mm:ss')
                        : null,
                      endDate
                        ? moment(endDate)
                          .endOf('day')
                          .format('YYYY-MM-DD HH:mm:ss')
                        : endDate
                    );
                  }}
                  fetchDataByName={name => {
                    return getStudentForSubjectbyQuery(
                      name,
                      selectedStatuses,
                      selectedStudyType,
                      startDate
                        ? moment(startDate)
                          .startOf('day')
                          .format('YYYY-MM-DD HH:mm:ss')
                        : null,
                      endDate
                        ? moment(endDate)
                          .endOf('day')
                          .format('YYYY-MM-DD HH:mm:ss')
                        : endDate
                    );
                  }}
                  setSearchQuery={setSearchQuery}
                />
              )}
            </div>
          } */
      />
      <DataDisplay
        TopSpacing={40}
        dataFullWidth
        data={
          <div className="student-list-page__list__display-list">
            {usersList && usersList.users && usersList.users.length > 0 ? (
              <UsersList usersList={usersList.users} />
            ) : (
              'Nije pronađen student za odabrani predmet'
            )}
          </div>
        }
      />
    </div>
  );
};

UsersListPage.propTypes = {};

export default UsersListPage;
