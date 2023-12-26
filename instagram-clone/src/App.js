/* eslint-disable no-unused-vars */
import React, { Suspense } from "react";
import { lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import useAuthListener from "./hooks/use-auth-listner.js";
import UserContext from "./context/user.js";
const Login = lazy(() => import("./pages/login.js"));
const Signup = lazy(() => import("./pages/signup.js"));
const NotFound = lazy(() => import("./pages/not-found.js"));
const Dashboard = lazy(() => import("./pages/dashboard.js"));
function App() {
  const { user } = useAuthListener();
  console.log('user:', user);
  console.log('Component using useAuthListener rendered');
  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="/" element={<Dashboard user={user} />} />
          </Routes>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
