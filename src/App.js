import React, { useState, useEffect, useMemo } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../src/pages/Home'
import New from './pages/New'
import All from './pages/All'
import NotFound from './pages/NotFound'
import Archive from './pages/Archive'
import Register from './pages/Register'
import Login from './pages/Login'
import {
  putAccessToken,
  getUserLogged,
  getAccessToken,
} from './utils/network-data'
import ActionHeader from './components/ActionHeader/ActionHeader'
import ThemeContext from './contexts/ThemeContext'
import LanguangeContext from './contexts/LanguangeContext'

export default function NoteApp() {
  const [authedUser, setAuthedUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [languange, setLanguange] = useState(
    () => localStorage.getItem("languange") || "en"
  );
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    localStorage.setItem("locale", languange);
  }, [languange]);

  useEffect(() => {
    localStorage.setItem("data-theme", theme);
    const root = document.documentElement;
    if (theme === "light") {
      root.setAttribute("data-theme", "light");
    } else {
      root.setAttribute("data-theme", "dark");
    }
  }, [theme]);

  const actionLanguange = () => {
    setLanguange((prevLocale) => (prevLocale === "en" ? "id" : "en"));
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const languangeContextValue = useMemo(
    () => ({
      languange,
      actionLanguange,
    }),
    [languange]
  );

  const themeContextValue = useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme]
  );

  const onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);
    getUserLogged().then(({ data }) => {
      setAuthedUser(data);
    });
  };

  const onLogout = () => {
    setAuthedUser(null);
    putAccessToken("");
  };

  useEffect(() => {
    getUserLogged().then(({ data }) => {
      setAuthedUser(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return null;
  }

  return authedUser === null ? (
    <LanguangeContext.Provider value={languangeContextValue}>
      <ThemeContext.Provider value={themeContextValue}>
        <div className="app-container">
          <ActionHeader />
          <main>
            <Routes>
              <Route
                path="/*"
                element={<Login loginSuccess={onLoginSuccess} />}
              />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
        </div>
      </ThemeContext.Provider>
    </LanguangeContext.Provider>
  ) : (
    <LanguangeContext.Provider value={languangeContextValue}>
      <ThemeContext.Provider value={themeContextValue}>
        <div className="app-container">
          <ActionHeader
            logout={onLogout}
            name={authedUser.name}
            access={getAccessToken()}
          />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/add" element={<New />} />
              <Route path="/detail/:id" element={<All />} />
              <Route path="/archived" element={<Archive />} />
              <Route path="/*" element={<NotFound />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
        </div>
      </ThemeContext.Provider>
    </LanguangeContext.Provider>
  );
}
