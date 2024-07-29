// CourtCard.js
import React from 'react';
import styles from '../styles/CourtCard.module.css'; // Import the CSS Module

function CourtCard({ court }) {
    return (
        <div className={styles.courtCard}>
            <h2>{court.name}</h2>
            <p>Location: {court.location}</p>
            <p>Status: {court.status}</p>
        </div>
    );
}

export default CourtCard;
