import React, { useContext } from "react";
import Content from "./components/Content";
import AuthProvider, { AuthContext } from "./context/AuthProvider";
import { Navigate, Route, Routes } from "react-router";
import Login from "./components/Auth/Login";
import SignUp from "./components/auth/SignUp";

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? <Navigate to="/" replace /> : children;
};

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        <Route 
          path="/signup" 
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          } 
        />

        {/* Private Routes */}
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <Content />
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export default App;
