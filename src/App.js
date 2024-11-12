import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Voitures from './pages/Voiture/Voitures';
import { getVoitures } from './services/api';

function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem('token') || null);
  const [voitures, setVoitures] = useState([]);
  const [isLogin, setIsLogin] = useState(true); // État pour basculer entre Login et Signup

  useEffect(() => {
    const fetchVoitures = async () => {
      if (authToken) {
        try {
          const data = await getVoitures(authToken);
          setVoitures(data);
        } catch (error) {
          console.error("Erreur lors de la récupération des voitures", error);
        }
      }
    };
    fetchVoitures();
  }, [authToken]);

  const handleAuthSuccess = (token) => {
    localStorage.setItem('token', token); // Stocker le token dans le localStorage
    setAuthToken(token);
  };

  return (
    <div className="App">
      {!authToken ? (
        isLogin ? (
          <Login setAuthToken={handleAuthSuccess} switchToSignup={() => setIsLogin(false)} />
        ) : (
          <Signup setAuthToken={handleAuthSuccess} switchToLogin={() => setIsLogin(true)} />
        )
      ) : (
        <Voitures voitures={voitures} />
      )}
    </div>
  );
}

export default App;
