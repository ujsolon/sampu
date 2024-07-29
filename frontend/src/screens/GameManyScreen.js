import React from 'react';
import GameCard from '../components/GameCard';
import '../styles/GameManyScreen.css';

function GameManyScreen() {
    const games = [
        { courtName: 'Court 1', time: '14:00', createdBy: 'John Doe', status: 'Scheduled' },
        { courtName: 'Court 2', time: '16:00', createdBy: 'Jane Smith', status: 'In Progress' },
        { courtName: 'Court 3', time: '18:00', createdBy: 'Jim Brown', status: 'Completed' }
    ];

    return (
        <div className="screen games-screen">
            <h2>Games</h2>
            <div className="container">
                {games.map((game, index) => (
                    <GameCard key={index} {...game} />
                ))}
            </div>
        </div>
    );
}

export default GameManyScreen;
