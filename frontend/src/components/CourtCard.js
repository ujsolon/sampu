// CourtCard.js
import React from 'react';
import '../styles/CourtCard.css';

function CourtCard({ court }) {
    return (
        <div className="court-card">
            <h2>{court.name}</h2>
            <p>Location: {court.location}</p>
            <p>Status: {court.status}</p>
        </div>
    )
}

export default CourtCard;
