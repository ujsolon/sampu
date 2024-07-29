// components/PlayerCard.js
import React from 'react';
import styles from '../styles/PlayerCard.module.css'; // Import the CSS Module

export default function PlayerCard({ player }) {
    return (
        <div className={styles.playerCard}>
            <h3>{player.name}</h3>
            <p>{player.email}</p>
            <p>{player.created_at}</p>
        </div>
    );
}
