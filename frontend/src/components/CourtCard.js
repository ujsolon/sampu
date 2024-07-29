import React from 'react';
import '../styles/CourtCard.css';

function CourtCard({ name, location, ownerName, status, createdAt }) {
    return (
        <div className="card court-card">
            <h3>{name}</h3>
            <p>Location: {location}</p>
            <p>Owner: {ownerName}</p>
            <p>Status: {status}</p>
            <p>Created: {new Date(createdAt).toLocaleDateString()}</p>
        </div>
    );
}

export default CourtCard;
