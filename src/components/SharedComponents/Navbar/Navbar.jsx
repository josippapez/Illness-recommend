import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { NavLink, useHistory } from 'react-router-dom';

import Logo from '../../../styles/assets/images/Logo.svg';
import './Navbar.scss';
import { logOutAndWipeLocalStorage } from '../../../interceptor';

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector(state => state.user);

  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [displayUserInfo, setDisplayUserInfo] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  /* useEffect(() => {
    if (user.role) {
      if (user.role === "student" && !studentInfo.id) {
        dispatch(fetchStudentInfo());
      }
      if (user.role === "mentor") {
        dispatch(fetchMentorInfo());
      }
      if (user.role === "professor") {
        dispatch(fetchProfessorInfo());
      }
    }
  }, []);

  useEffect(() => {
    if (mentorInfo && user.role === "mentor") {
      setUserInfo(mentorInfo);
    }
    if (professorInfo && user.role === "professor") {
      setUserInfo(professorInfo);
    }
    if (studentInfo && studentInfo.id && user.role === "student") {
      setUserInfo(studentInfo);
    }
  }, [mentorInfo, studentInfo, professorInfo]); */

  return (
    user.isAuthenticated &&
    window.location.pathname !== '/login' && (
      <div className="navbar">
        <div
          className="navbar-logo"
          onClick={() => {
            history.replace('/');
          }}
        >
          <img className="navbar-logo__image" src={Logo} alt="logo-image" />
        </div>
        <div className="navbar-links">
          <NavLink
            className="navbar-item"
            exact
            to="/"
            activeClassName="active"
          >
            Početna stranica
          </NavLink>
          {user.role === 'admin' && (
            <div>
              <NavLink
                className="navbar-item"
                to="/users"
                activeClassName="active"
              >
                Korisnici
              </NavLink>
              <NavLink
                className="navbar-item"
                to="/medications"
                activeClassName="active"
              >
                Lijekovi
              </NavLink>
            </div>
          )}
          {user.role === 'user' && (
            <div>
              <NavLink
                className="navbar-item"
                to="/user-details"
                activeClassName="active"
              >
                Korisnički detalji
              </NavLink>
            </div>
          )}
          <button
            className="navbar-item"
            onClick={() => {
              logOutAndWipeLocalStorage();
            }}
          >
            Odjava
          </button>
        </div>
      </div>
    )
  );
};

export default Navbar;
