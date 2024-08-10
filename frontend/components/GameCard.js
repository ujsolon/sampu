import React from 'react';
import styles from '../styles/GameCard.module.css'; // Import the CSS Module
import { formatDistanceToNow, parseISO } from 'date-fns'; // Import date-fns for time formatting

function GameCard({ game }) {
    const gameDateTime = parseISO(`${game.date}T${game.time}`); // Combine date and time into ISO format
    const elapsedTime = formatDistanceToNow(gameDateTime, { addSuffix: true }); // Get time distance from now

    return (
        <div className={styles.gameCard}>
            <h2>{game.id}</h2>
            <p>Date: {game.time}</p>
            <p>Status: {game.status}</p>
            <p>Elapsed Time: {elapsedTime}</p> {/* Display elapsed time */}
        </div>
    );
}

export default GameCard;
