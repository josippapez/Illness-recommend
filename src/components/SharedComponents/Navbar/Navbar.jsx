import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

import './Navbar.scss';
import { logOutAndWipeLocalStorage } from '../../../interceptor';
import { setDarkTheme } from '../../../store/actions';

import Logo from '../../../styles/assets/images/Logo.svg';
import LogoWithWhiteText from '../../../styles/assets/images/LogoWhiteText.svg';
import HomeImage from '../../../styles/assets/images/home.svg';
import HomeImageWhite from '../../../styles/assets/images/homeWhite.svg';
import UserDetailsImage from '../../../styles/assets/images/resume.svg';
import UserDetailsImageWhite from '../../../styles/assets/images/resumeWhite.svg';
import MedicationSuggestionImage from '../../../styles/assets/images/medicine.svg';
import MedicationSuggestionImageWhite from '../../../styles/assets/images/medicineWhite.svg';
import UsersListImage from '../../../styles/assets/images/user.svg';
import UsersListImageWhite from '../../../styles/assets/images/userWhite.svg';
import LogoutImage from '../../../styles/assets/images/login-arrow-symbol-entering-back-into-a-square.svg';
import LogoutImageWhite from '../../../styles/assets/images/login-arrow-symbol-entering-back-into-a-square-white.svg';

const Navbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const theme = useSelector(state => state.theme);
  const user = useSelector(state => state.user);
  const patient = useSelector(state => state.patient.currentPatientInfo);

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
          <img
            className="navbar-logo__image"
            src={theme.darkTheme ? LogoWithWhiteText : Logo}
            alt="logo-image"
          />
        </div>
        <div className="darkmode-switch">
          <input
            type="checkbox"
            className="darkmode-switch__input"
            id="Switch"
            readOnly
            checked={!theme.darkTheme}
            onClick={() => dispatch(setDarkTheme(!theme.darkTheme))}
          />
          <label className="darkmode-switch__label" htmlFor="Switch">
            <span className="darkmode-switch__indicator"></span>
            <span className="darkmode-switch__decoration"></span>
          </label>
        </div>
        <div className="navbar-links">
          <NavLink
            className="navbar-item"
            exact
            to="/"
            activeClassName="active"
          >
            <img
              src={theme.darkTheme ? HomeImageWhite : HomeImage}
              alt="home"
              className="navbar-icon"
            />
            Početna stranica
          </NavLink>
          {user.role === 'admin' && (
            <div>
              <NavLink
                className="navbar-item"
                to="/users"
                activeClassName="active"
              >
                <img
                  src={theme.darkTheme ? UsersListImageWhite : UsersListImage}
                  alt="home"
                  className="navbar-icon"
                />
                Liječnici
              </NavLink>
              <NavLink
                className="navbar-item"
                to="/medications"
                activeClassName="active"
              >
                <img
                  src={
                    theme.darkTheme
                      ? MedicationSuggestionImageWhite
                      : MedicationSuggestionImage
                  }
                  alt="home"
                  className="navbar-icon"
                />
                Lijekovi
              </NavLink>
            </div>
          )}
          {user.role === 'user' && (
            <div>
              <NavLink
                className="navbar-item"
                to="/patient-details"
                activeClassName="active"
              >
                <img
                  src={
                    theme.darkTheme ? UserDetailsImageWhite : UserDetailsImage
                  }
                  alt="home"
                  className="navbar-icon"
                />
                Detalji pacijenta
              </NavLink>
              {patient && (
                <NavLink
                  className="navbar-item"
                  to="/medication-suggestion"
                  activeClassName="active"
                >
                  <img
                    src={
                      theme.darkTheme
                        ? MedicationSuggestionImageWhite
                        : MedicationSuggestionImage
                    }
                    alt="home"
                    className="navbar-icon"
                  />
                  Prijedlog lijekova
                </NavLink>
              )}
            </div>
          )}
          <NavLink
            className="navbar-item"
            to="/patients-details-history"
            activeClassName="active"
          >
            <img
              src={theme.darkTheme ? UserDetailsImageWhite : UserDetailsImage}
              alt="home"
              className="navbar-icon"
            />
            {user.role === 'admin' ? 'Podaci pacijenata' : 'Prošli pacijenti'}
          </NavLink>
          <button
            className="navbar-item"
            onClick={() => {
              logOutAndWipeLocalStorage();
            }}
          >
            <img
              src={theme.darkTheme ? LogoutImageWhite : LogoutImage}
              alt="home"
              className="navbar-icon"
            />
            Odjava
          </button>
        </div>
      </div>
    )
  );
};

export default Navbar;
