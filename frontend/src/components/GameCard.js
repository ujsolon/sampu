// GameCard.js
import React from 'react';
import '../styles/GameCard.css';

function GameCard({ game }) {
    return (
        <div className="game-card">
            <h2>Game at {game.court.name}</h2>
            <p>Time: {game.time}</p>
            <p>Status: {game.status}</p>
            <p>Created by: {game.creator.name}</p>
            <p>Created at: {new Date(game.created_at).toLocaleString()}</p>
        </div>
    )
}

export default GameCard;
