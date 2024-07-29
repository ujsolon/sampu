// components/GameCard.js
import React from 'react';
import styles from '../styles/GameCard.module.css'; // Import the CSS Module

function GameCard({ game }) {
    return (
        <div className={styles.gameCard}>
            <h2>{game.id}</h2>
            <p>Date: {game.time}</p>
            <p>Status: {game.status}</p>
        </div>
    );
}

export default GameCard;
