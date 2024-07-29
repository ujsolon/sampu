import React from 'react';
import PlayerCard from '../components/PlayerCard';
import '../styles/PlayerOneScreen.css';

function PlayerOneScreen() {
    const player = { name: 'John Doe', email: 'john@example.com', createdAt: '2023-06-15T00:00:00Z' };

    return (
        <div className="screen player-info-screen">
            <h2>Player Info</h2>
            <PlayerCard {...player} />
        </div>
    );
}

export default PlayerOneScreen;
