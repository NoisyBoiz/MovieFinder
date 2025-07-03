import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import './i18n/i18n.jsx';
import './styles/globalStyle.css';

import DarkMode from './utils/darkMode';
import LocalStorage from './utils/localStorage.jsx';

import { publicRoutes } from './router/routes.jsx';
import Layout from './layout/index.jsx';
import { NotificationProvider } from "./component/notification.jsx";

function Main() {
  const { i18n } = useTranslation();

  function setting() {
    i18n.changeLanguage(LocalStorage.getLanguage());
    DarkMode(LocalStorage.getDarkMode());
  }

  useEffect(() => {
    setting();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <Routes>
        {publicRoutes.map((route, index) => {
          const LayoutPage = route.layout === null ? React.Fragment : Layout;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <LayoutPage>
                  <route.component />
                </LayoutPage>
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <NotificationProvider>
    <Main />
  </NotificationProvider>
);
