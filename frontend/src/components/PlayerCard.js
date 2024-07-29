import React from 'react';
import '../styles/PlayerCard.css';

function PlayerCard({ name, email, createdAt }) {
    return (
        <div className="card player-card">
            <h3>{name}</h3>
            <p>Email: {email}</p>
            <p>Joined: {new Date(createdAt).toLocaleDateString()}</p>
        </div>
    );
}

export default PlayerCard;
