import classNames from 'classnames';
import Cookies from 'js-cookie';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loginError, loginUser, registerUser } from '../../store/actions';
import DataDisplay from '../SharedComponents/DataDisplay/DataDisplay';
import backgroundImg from '../../styles/assets/images/undraw_Mobile_login_re_9ntv.svg';

import './Login.scss';

function Login() {
  const user = useSelector(state => state.user);
  const errorMessage = useSelector(state => state.user.error);
  const dispatch = useDispatch();

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [showForm, setShowForm] = useState(null);
  const [showRegistration, setShowRegistration] = useState(null);
  const [displayPassword, setDisplayPassword] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (
      user &&
      user.id &&
      Cookies.get('Refreshtoken') &&
      Cookies.get('Accesstoken')
    ) {
      window.location.replace('/');
    }
  }, [user]);

  return (
    !user.isAuthenticated && (
      <div className="login">
        <div className="login-site">
          <div className="login-site__text text-pop-up-top">
            <div className="site-title">Preporuke lijekova</div>
            <div className="site-text-under-title">
              Odaberite jednu od opcija za nastavak.
            </div>
          </div>
          <img src={backgroundImg} alt="background" className="site-logo" />
          <div className="login__button-container">
            <button
              className="login__button-container__register-btn"
              type="button"
              onClick={() => {
                setShowRegistration(true);
                setShowForm(true);
              }}
            >
              <div className="login__button-container__register-btn__text">
                Registracija
              </div>
            </button>
            <button
              className="login__button-container__login-btn"
              type="button"
              onClick={() => setShowForm(true)}
            >
              <div className="login__button-container__login-btn__text">
                Prijava
              </div>
            </button>
          </div>
        </div>
        <form
          className={classNames({
            'login-form': showForm || showForm === false,
            isClosed: showForm === false,
          })}
          onSubmit={e => {
            e.preventDefault();
            if (showRegistration) {
              dispatch(registerUser(name, email, password));
            } else {
              dispatch(loginUser(email, password));
            }
          }}
          onClick={e => {
            if (
              e.target.className !== 'content-container__email' &&
              e.target.className !== 'content-container__password' &&
              buttonRef.current
            ) {
              buttonRef.current.focus();
            }
          }}
        >
          {showForm && (
            <div className="login-form__form">
              <div className="content-container">
                <div className="header">
                  <div
                    type="btn"
                    className="header__back"
                    onClick={() => {
                      setShowForm(false);
                      setShowRegistration(false);
                      dispatch(
                        loginError({ message: null, status: null, error: null })
                      );
                    }}
                  />
                  <div className="sign-in-image" />
                  <div className="form-title">
                    <div className="form-title__main">
                      {showRegistration ? 'Registracija' : 'Prijava'}
                    </div>
                    <div className="form-title__small-text">
                      {`Unesite svoje podatke kako biste se ${
                        showRegistration ? 'registrirali' : 'prijavili'
                      }`}
                    </div>
                  </div>
                </div>
                <div className="body">
                  {showRegistration && (
                    <DataDisplay
                      removeTopSeparator
                      dataHeader="Ime i prezime"
                      headerBolded
                      headerFontSize={13}
                      displayInColumn
                      dataSeparatorTopSpacing={6}
                      data={
                        <>
                          <input
                            className="content-container__email"
                            type="text"
                            aria-autocomplete="inline"
                            onChange={e => {
                              e.preventDefault();
                              setName(e.target.value);
                            }}
                            value={name ? name : ''}
                            placeholder="Ime i prezime"
                            name="name"
                          />
                          {errorMessage &&
                            errorMessage.length > 0 &&
                            errorMessage.find(
                              error => error.field === 'name'
                            ) && (
                            <div>
                              {errorMessage.map(
                                error =>
                                  error.field === 'name' && (
                                    <div className="error">
                                      {error.message}
                                    </div>
                                  )
                              )}
                            </div>
                          )}
                        </>
                      }
                    />
                  )}
                  <DataDisplay
                    removeTopSeparator={!showRegistration}
                    dataHeader="Email Adresa"
                    headerBolded
                    headerFontSize={13}
                    displayInColumn
                    dataSeparatorTopSpacing={6}
                    data={
                      <input
                        className="content-container__email"
                        type="email"
                        aria-autocomplete="inline"
                        onChange={e => {
                          e.preventDefault();
                          setEmail(e.target.value);
                        }}
                        value={email ? email : ''}
                        placeholder="E-mail"
                        name="email"
                      />
                    }
                  />
                  <DataDisplay
                    dataHeader="Lozinka"
                    headerBolded
                    headerFontSize={13}
                    displayInColumn
                    dataSeparatorTopSpacing={6}
                    data={
                      <div className="password-input">
                        <input
                          className="content-container__password"
                          type={displayPassword ? 'text' : 'password'}
                          value={password ? password : ''}
                          onChange={e => {
                            e.stopPropagation();
                            e.preventDefault();
                            setPassword(e.target.value);
                          }}
                          placeholder="Lozinka"
                          name="password"
                        />
                        <div
                          onClick={() => setDisplayPassword(!displayPassword)}
                          className={classNames({
                            'password-icon': true,
                            'hide-password': !displayPassword,
                            'show-password': displayPassword,
                          })}
                        />
                      </div>
                    }
                  />
                  <button
                    ref={buttonRef}
                    className="content-container__btn"
                    autoFocus
                    type="submit"
                  >
                    {showRegistration ? 'Registriraj se' : 'Prijavi se'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    )
  );
}

export default Login;
