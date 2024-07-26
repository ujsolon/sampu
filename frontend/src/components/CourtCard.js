import React from 'react';

function CourtCard({ courtNumber, nextGame, players, maxPlayers, hasGame }) {
    return (
        <div className="court-card">
            <h3>Court{courtNumber}</h3>
            {hasGame && <p className="game-label">GAME</p>}
            <p>Next game: {nextGame}</p>
            <p>Players: {players} ({maxPlayers})</p>
        </div>
    );
}

export default CourtCard;