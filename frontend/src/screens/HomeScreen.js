import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomeScreen.css';

function HomeScreen() {
    return (
        <div className="home-screen">
            <h1>Welcome to the Sports App</h1>
            <div className="nav-links">
                <Link to="/courts" className="nav-link">Courts</Link>
                <Link to="/games" className="nav-link">Games</Link>
                <Link to="/player" className="nav-link">Player Info</Link>
            </div>
        </div>
    );
}

export default HomeScreen;
