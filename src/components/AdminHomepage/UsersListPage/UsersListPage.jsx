import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './UsersListPage.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, searchUsersByText } from '../../../store/actions';
import DataDisplay from '../../SharedComponents/DataDisplay/DataDisplay';
import UsersList from './UsersList/UsersList';
import UserInfoModal from './UserInfoModal/UserInfoModal';
import Search from '../../SharedComponents/Search/Search';

const UsersListPage = props => {
  const dispatch = useDispatch();
  const usersList = useSelector(state => state.usersList);

  const [showUserInfoModal, setShowUserInfoModal] = useState(false);
  const [userId, setUserId] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <div className="users-list-page">
      <DataDisplay
        dataHeader="Popis korisnika"
        headerBolded
        headerFontSize={23}
        headerTextColor={props.theme.darkTheme ? '#fff' : '#005BA7'}
        dataFullWidth
        TopSpacing={30}
        floatDataRight
        data={
          <Search
            searchingByInfo="*Pretraživanje po Imenu i Email-u"
            fetchData={() => {
              return getAllUsers();
            }}
            fetchDataByName={text => {
              return searchUsersByText(text);
            }}
            setSearchQuery={setSearchQuery}
          />
        }
      />
      <DataDisplay
        TopSpacing={40}
        dataFullWidth
        data={
          <div className="users-list-page__list__display-list">
            {usersList && usersList.users && usersList.users.length > 0 ? (
              <UsersList
                usersList={usersList.users}
                setUserId={setUserId}
                setShowUserInfoModal={setShowUserInfoModal}
              />
            ) : (
              <div className="users-list-page__list__display-list__not-found">
                {searchQuery
                  ? 'Nema pronđenih korisnika'
                  : 'Nema unesenih korisnika'}
              </div>
            )}
          </div>
        }
      />
      {showUserInfoModal && (
        <UserInfoModal
          userId={userId}
          setUserId={setUserId}
          setShowUserInfoModal={setShowUserInfoModal}
        />
      )}
    </div>
  );
};

UsersListPage.propTypes = {
  theme: PropTypes.object,
};

export default UsersListPage;
