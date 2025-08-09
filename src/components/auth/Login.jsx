import React, { useRef, useContext, useEffect } from "react";
import { auth } from "../../firebaseConfig";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate, Link } from "react-router";
import { AuthContext } from "../../context/AuthProvider";

const Login = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();

  // Redirect to home if user is already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      // Navigation will be handled by useEffect when user state changes
    } catch (error) {
      console.error("Login error:", error.message);
      // You can add error state here to display to user
    }
  };

  // Don't render login form if user is already logged in
  if (user) {
    return null;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <input 
              className="input w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
              ref={emailRef} 
              type="email" 
              placeholder="Email address"
              required 
            />
            <input 
              className="input w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" 
              ref={passwordRef} 
              type="password" 
              placeholder="Password"
              required 
            />
          </div>
          <div>
            <button 
              className="btn w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" 
              type="submit"
            >
              Sign in
            </button>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
