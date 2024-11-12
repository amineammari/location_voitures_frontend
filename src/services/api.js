// src/services/api.js
import axios from 'axios';

// Base URL de l'API Flask
const API_URL = 'http://localhost:5000';

// Authentification
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password,
    });
    return response.data; // Contient le token JWT
  } catch (error) {
    throw error;
  }
};

//admin register
export const register = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      username,
      password,
      role : 'admin',
    });
    return response.data; // Contient le token JWT
  } catch (error) {
    throw error;
  }
};

//user register
export const signup = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, {
      username,
      password,
      role : 'locataire',
    });
    return response.data; // Contient le token JWT
  } catch (error) {
    throw error;
  }
};

// Fonctions pour Voitures
export const getVoitures = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/api/voitures`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addVoiture = async (token, voiture) => {
  try {
    const response = await axios.post(`${API_URL}/api/voitures`, voiture, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateVoiture = async (token, id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/api/voitures/${id}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getVoiture = async (token, id ) => {
  try {
    const response = await axios.get(`${API_URL}/api/voitures/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteVoiture = async (token, id) => {
  try {
    const response = await axios.delete(`${API_URL}/api/voitures/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fonctions pour Locataires
export const getLocataires = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/api/locataires`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addLocataire = async (token, locataire) => {
  try {
    const response = await axios.post(`${API_URL}/api/locataires`, locataire, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateLocataire = async (token, id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/api/locataires/${id}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteLocataire = async (token, id) => {
  try {
    const response = await axios.delete(`${API_URL}/api/locataires/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getLocataire = async (token,id) => {
  try {
    const response = await axios.get(`${API_URL}/api/locataires/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


// Fonctions pour Locations
export const louerVoiture = async (token, voitureId, locataireId) => {
  try {
    const response = await axios.post(`${API_URL}/api/locations`, 
      { voiture_id: voitureId, locataire_id: locataireId }, 
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const rendreVoiture = async (token, locationId) => {
  try {
    const response = await axios.post(`${API_URL}/api/locations/${locationId}/retour`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getParcVoitures = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/api/parc_voitures`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
