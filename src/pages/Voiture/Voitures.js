// src/pages/Voitures.js
import React from 'react';

const Voitures = ({ voitures }) => {
  return (
    <div>
      <h2>Liste des Voitures</h2>
      <ul>
        {voitures.map((voiture) => (
          <li key={voiture.id}>
            {voiture.marque} {voiture.modele} - {voiture.kilometrage} km - {voiture.etat}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Voitures;
