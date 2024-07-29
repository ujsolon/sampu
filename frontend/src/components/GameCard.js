import React from 'react';
import '../styles/GameCard.css';

function GameCard({ courtName, time, createdBy, status }) {
    return (
        <div className="card game-card">
            <h3>Game at {courtName}</h3>
            <p>Time: {time}</p>
            <p>Created by: {createdBy}</p>
            <p>Status: {status}</p>
        </div>
    );
}

export default GameCard;
