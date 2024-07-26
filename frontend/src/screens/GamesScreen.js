import React from 'react';

function GamesScreen() {
    return (
        <div className="games-screen">
            <h2>Games</h2>
            <div className="date-sections">
                <section>
                    <h3>Today</h3>
                    <div className="game-card">
                        <h4>3PM today</h4>
                        <p>Court: Court1</p>
                        <p>Players: 5 (17)</p>
                    </div>
                </section>
                <section>
                    <h3>Tomorrow</h3>
                    <div className="game-card">
                        <h4>8PM tom</h4>
                        <p className="game-label">GAME</p>
                        <p>Court: Court2</p>
                        <p>Players: 10 (21)</p>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default GamesScreen;