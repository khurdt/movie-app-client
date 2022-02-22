import React, { useState } from 'react';
import '../login-view/login-view.scss';

export function RegistrationView(props) {
  const [username, newUsername] = useState('');
  const [password, newPassword] = useState('');
  const [email, newEmail] = useState('');
  const [birthday, newBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    props.onRegister();
  }

  return (
    <>
      <h1>Welcome to myFlix</h1>
      <form className='login'>
        <label className='username'>
          Username:
          <input type='text' value={username} onChange={e => newUsername(e.target.value)} />
        </label>
        <label className='password'>
          Password:
          <input type='password' value={password} onChange={e => newPassword(e.target.value)} />
        </label>
        <label className='password'>
          Email:
          <input type='email' value={email} onChange={e => newEmail(e.target.value)} />
        </label>
        <label className='password'>
          Birthday:
          <input type='text' value={birthday} onChange={e => newBirthday(e.target.value)} />
        </label>
        <button className='submit' type='submit' onClick={handleSubmit}>Submit</button>
      </form>
    </>
  )
}
