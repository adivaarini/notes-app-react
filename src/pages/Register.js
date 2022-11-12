import React from 'react'
import { useNavigate } from 'react-router-dom'
import ActionRegister from '../components/RegisterPage/ActionRegister'
import { register } from '../utils/network-data'

export default function Register() {
  const navigate = useNavigate();

  const onRegisterHandler = async (users) => {
    const { error } = await register(users);
    if (!error) {
      navigate("/");
    }
  };

  return (
    <>
      <ActionRegister register={onRegisterHandler} />
    </>
  );
}
