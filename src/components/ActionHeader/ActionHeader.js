import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { TbLogout } from 'react-icons/tb'
import PropTypes from 'prop-types'
import ActionTheme from './ActionTheme'
import ActionLanguange from './ActionLanguange'
import LanguangeContext from '../../contexts/LanguangeContext'

export default function ActionHeader({ logout, name, access }) {
  const { languange } = useContext(LanguangeContext);

  return access === undefined ? (
    <header>
      <h1>
        <Link to="/">{languange === "en" ? "Personal Notes App" : "Aplikasi Catatan Pribadi"}</Link>
      </h1>
      <ActionLanguange />
      <ActionTheme />
    </header>
  ) : (
    <header>
      <h1>
        <Link to="/">{languange === "en" ? "Personal Notes App" : "Aplikasi Catatan Pribadi"}</Link>
      </h1>
      <nav className="navigation">
        <ul>
          <li>
            <Link to="/archived">{languange === "en" ? "Archive" : "Arsip"}</Link>
          </li>
        </ul>
      </nav>
      <ActionLanguange />
      <ActionTheme />
      <button type="button" className="button-logout" onClick={logout}>
        <TbLogout />
        {name}
      </button>
    </header>
  );
}

ActionHeader.propTypes = {
  logout: PropTypes.func,
  name: PropTypes.string,
  access: PropTypes.string,
};
