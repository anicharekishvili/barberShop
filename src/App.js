import { AuthorizedRoutes, UnauthorizedRoutes } from './components/Guards';
import { useState } from 'react';
import './App.scss';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import SignupClient from './components/SignupClient';
import SignupBarber from './components/SignupBarber';
import HomePage from './components/homePage';

function App() {
  const [activeUser, setActiveUser] = useState(null);

  const addActiveUser = user => {
    setActiveUser(user);
  };

  const handleSignout = () => {
    setActiveUser(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<Navigate to='/auth/login' />} />
        <Route
          path='homePage'
          element={
            <AuthorizedRoutes user={activeUser}>
              <HomePage email={activeUser?.email} signOut={handleSignout} />
            </AuthorizedRoutes>
          }
        ></Route>
        <Route
          path='auth/login'
          element={
            <UnauthorizedRoutes user={activeUser}>
              <div className='containerCustom'>
                <Login addActiveUser={addActiveUser} />
              </div>
            </UnauthorizedRoutes>
          }
        />
        <Route
          path='auth/signup'
          element={
            <UnauthorizedRoutes user={activeUser}>
              <div className='containerCustom'>
                <SignupClient addActiveUser={addActiveUser} />
              </div>
            </UnauthorizedRoutes>
          }
        />
        <Route
          path='auth/signup-barber'
          element={
            <UnauthorizedRoutes user={activeUser}>
              <div className='containerCustom'>
                <SignupBarber />
              </div>
            </UnauthorizedRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
