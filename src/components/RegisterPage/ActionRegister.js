import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import useInput from '../../hooks/useInput'
import LanguangeContext from '../../contexts/LanguangeContext'

export default function ActionRegister({ register }) {
  const [name, onNameChange] = useInput("");
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const [confirmPassword, onConfirmPasswordChange] = useInput("");
  const { languange } = useContext(LanguangeContext);

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      if (!isValidEmail(email)) {
        window.alert("Invalid Email!");
      } else {
        register({
          name,
          email,
          password,
        });
      }
    } else {
      window.alert("Password and Password Confirm must be same!");
    }
  };
  return (
    <>
      <section className="register-page">
        <h2>
          {languange === "en"
            ? "Please fill in the data to register an account!"
            : "Silahkan isi data untuk mendaftar akun!"}
        </h2>
      </section>
      <div className="input-register">
        <label htmlFor="name">Name</label>
        <input type="text" id="name" value={name} onChange={onNameChange} />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={email} onChange={onEmailChange} />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={onPasswordChange}
        />
        <label htmlFor="confirm-password">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
        />
        <button className="action" type="button" onClick={onSubmitHandler}>
          {languange === "en" ? "Register" : "Daftar"}
        </button>
      </div>
      <p>
        {languange === "en" ? "Already have an account?" : "Sudah mempunyai akun?"}
      </p>
      <Link to="/">{languange === "en" ? "Login Here" : "Login disini"} </Link>
    </>
  );
}

ActionRegister.propTypes = {
  register: PropTypes.func.isRequired,
};
