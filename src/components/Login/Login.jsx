import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../../store/actions';

function Login() {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  useEffect(() => {
    if (user && user.id) {
      window.location.replace('/');
    }
  }, [user]);

  return (
    <div className="Login">
      <header className="Login-header">
        <div>registracija</div>
        <input
          type="text"
          name="name"
          value={name ? name : ''}
          onChange={e => {
            setName(e.target.value);
          }}
        />

        <input
          type="email"
          name="email"
          value={email ? email : ''}
          onChange={e => {
            setEmail(e.target.value);
          }}
        />

        <input
          type="password"
          name="password"
          value={password ? password : ''}
          onChange={e => {
            setPassword(e.target.value);
          }}
        />

        <button
          onClick={() => {
            dispatch(registerUser(name, email, password));
          }}
        >
          Pošalji
        </button>

        <div>Prijava</div>

        <input
          type="email"
          name="email"
          value={email ? email : ''}
          onChange={e => {
            setEmail(e.target.value);
          }}
        />

        <input
          type="password"
          name="password"
          value={password ? password : ''}
          onChange={e => {
            setPassword(e.target.value);
          }}
        />

        <button
          onClick={() => {
            dispatch(loginUser(email, password));
          }}
        >
          Pošalji
        </button>
      </header>
    </div>
  );
}

export default Login;
