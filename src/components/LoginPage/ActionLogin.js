import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import LanguangeContext from '../../contexts/LanguangeContext'
import useInput from '../../hooks/useInput'

export default function ActionLogin({ login }) {
  const { languange } = useContext(LanguangeContext);
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");

  const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (!isValidEmail(email)) {
      window.alert("Invalid Email!");
    } else {
      login({
        email,
        password,
      });
    }
  };

  return (
    <>
      <section className="login-page">
        <h2>
          {languange === "en"
            ? "Please login to use the application!"
            : "Silahkan masuk untuk menggunakan aplikasi!"}
        </h2>
      </section>
      <div className="input-login">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={email} onChange={onEmailChange} />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={onPasswordChange}
        />

        <button className="action" type="button" onClick={onSubmitHandler}>
          {languange === "en" ? "Login" : "Masuk"}
        </button>
      </div>
      <p>{languange === "en" ? "Don't have an account yet?" : "Belum mempunyai akun?"}</p>
      <Link to="/register">
        {languange === "en" ? "Register first here" : "Daftar terlebih dahulu disini"}
      </Link>
    </>
  );
}

ActionLogin.propTypes = {
  login: PropTypes.func.isRequired,
};
