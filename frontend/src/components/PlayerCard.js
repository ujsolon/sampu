// PlayerCard.js
import React from 'react';
import '../styles/PlayerCard.css';

function PlayerCard({ player }) {
    return (
        <div className="player-card">
            <h2>{player.name}</h2>
            <p>Email: {player.email}</p>
            <p>Status: {player.status}</p>
            <p>Joined: {new Date(player.created_at).toLocaleDateString()}</p>
        </div>
    )
}

export default PlayerCard;
