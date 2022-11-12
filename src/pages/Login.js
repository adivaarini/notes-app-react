import React from 'react'
import ActionLogin from '../components/LoginPage/ActionLogin'
import { login } from '../utils/network-data'

export default function Login({ loginSuccess }) {
  const onLoginHandler = async (users) => {
    const { error, data } = await login(users);
    if (!error) {
      loginSuccess(data);
    }
  };

  return (
    <>
      <ActionLogin login={onLoginHandler} />
    </>
  );
}
