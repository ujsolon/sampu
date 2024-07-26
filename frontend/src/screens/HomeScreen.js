import React from 'react';
import CourtCard from '../components/CourtCard';

function HomeScreen() {
    return (
        <div className="sampu-app">
            <header>
                <h1>Sampu</h1>
                <nav>
                    <span>Courts</span>
                    <span>Games</span>
                    <span>My account</span>
                </nav>
            </header>
            <main>
                <h2>Near me</h2>
                <div className="court-list">
                    <CourtCard
                        courtNumber={1}
                        nextGame="3PM today"
                        players={5}
                        maxPlayers={17}
                    />
                    <CourtCard
                        courtNumber={2}
                        nextGame="7PM today"
                        players={10}
                        maxPlayers={21}
                        hasGame={true}
                    />
                    <CourtCard
                        courtNumber={3}
                        nextGame="8AM tom"
                        players={8}
                        maxPlayers={30}
                    />
                </div>
            </main>
        </div>
    );
}

export default HomeScreen;