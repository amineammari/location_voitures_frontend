import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes and Route
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard'; // Import Dashboard
import { getVoitures } from './services/api';

function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token') || null);
  const [voitures, setVoitures] = useState([]);
  const [isLogin, setIsLogin] = useState(true); // State for toggling between Login and Signup
  const [loading, setLoading] = useState(true); // For handling loading state
  const [error, setError] = useState(null); // For handling errors when fetching voitures

  useEffect(() => {
    const fetchVoitures = async () => {
      if (authToken) {
        try {
          const data = await getVoitures(authToken);
          setVoitures(data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching cars', error);
          setError('Failed to fetch cars. Please try again later.');
          setLoading(false);
        }
      } else {
        setLoading(false); // Stop loading if there's no token
      }
    };

    fetchVoitures();
  }, [authToken]);

  const handleAuthSuccess = (token) => {
    localStorage.setItem('token', token); // Store token in localStorage
    setAuthToken(token);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
  };

  return (
    <Router> {/* Wrap the entire app with BrowserRouter */}
      <div className="App">
        {loading ? (
          <div>Loading...</div> // Loading state
        ) : error ? (
          <div>{error}</div> // Error handling
        ) : (
          <Routes> {/* Use Routes for routing */}
            <Route path="/" element={
              !authToken ? (
                isLogin ? (
                  <Login setAuthToken={handleAuthSuccess} switchToSignup={() => setIsLogin(false)} />
                ) : (
                  <Signup setAuthToken={handleAuthSuccess} switchToLogin={() => setIsLogin(true)} />
                )
              ) : (
                <Dashboard authToken={authToken} handleLogout={handleLogout} />
              )
            } />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
