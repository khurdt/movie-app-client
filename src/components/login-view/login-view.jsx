import React, { useState } from 'react';
import './login-view.scss';
import PropTypes from 'prop-types';


export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    props.onLoggedIn(username);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
  };

  return (
    <>
      <h1>Login to myFlix</h1>
      <form className='login'>
        <label className='username'>
          Username:
          <input type='text' value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label className='password'>
          Password:
          <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <button className='submit' type='submit' onClick={handleSubmit}>Submit</button>
        <button className='submit' type='button' onClick={() => {
          props.onRegister(null);
        }}>Register Here</button>
      </form>
    </>
  )
}

LoginView.propTypes = {
  // username: PropTypes.string.isRequired,
  // password: PropTypes.string.isRequired,
  onLoggedIn: PropTypes.func.isRequired
};