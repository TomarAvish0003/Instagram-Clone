/* eslint-disable no-unused-vars */
import React, { Suspense } from 'react';
import { lazy } from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import * as ROUTES from './constants/routes';
const Login = lazy(() => import('./pages/login.js'));
const Signup = lazy(() => import('./pages/signup.js'));
function App() {
  return (
    <Router>
      <Suspense fallback = {<p>Loading...</p>}>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
      </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
