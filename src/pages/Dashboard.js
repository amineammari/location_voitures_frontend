// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import { getVoitures, louerVoiture, getLocataire } from '../services/api';

const Dashboard = ({ authToken, handleLogout }) => {
  const [voitures, setVoitures] = useState([]);
  const [rentalHistory, setRentalHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch available cars and rental history
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cars = await getVoitures(authToken);
        setVoitures(cars);
      } catch (error) {
        setError("Error fetching available cars");
      }

      try {
        const locataire = await getLocataire(authToken);  // Assuming the locataire has rental history
        setRentalHistory(locataire.history);  // Update based on actual API response
      } catch (error) {
        setError("Error fetching rental history");
      }
      setLoading(false);
    };

    fetchData();
  }, [authToken]);

  const handleRentCar = async (carId) => {
    try {
      const locataireId = 1;  // Replace with actual logged-in user ID
      await louerVoiture(authToken, carId, locataireId);
      alert("Car rented successfully!");
      
      // Refetch rental history after renting the car
      const locataire = await getLocataire(authToken);
      setRentalHistory(locataire.history);  // Update rental history after renting the car
    } catch (error) {
      setError("Error renting the car");
    }
  };

  return (
    <div className="dashboard-container">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>
          <h2>Available Cars</h2>
          <div>
            {voitures.map((voiture) => (
              <div key={voiture.id}>
                <h3>{voiture.model}</h3>
                <button onClick={() => handleRentCar(voiture.id)}>Rent</button>
              </div>
            ))}
          </div>
          <h2>Rental History</h2>
          <div>
            {rentalHistory.length === 0 ? (
              <p>No rental history found.</p>
            ) : (
              rentalHistory.map((history) => (
                <div key={history.id}>
                  <p>{history.date} - {history.carModel}</p>
                </div>
              ))
            )}
          </div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
