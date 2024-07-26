import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import GamesScreen from './screens/GamesScreen';

function App() {
    return (
        <Router>
            <div className="App">
                <header>
                    <h1>Sampu</h1>
                    <nav>
                        <Link to="/">Courts</Link>
                        <Link to="/games">Games</Link>
                        <Link to="/account">My account</Link>
                    </nav>
                </header>

                <Routes>
                    <Route path="/" element={<HomeScreen />} />
                    <Route path="/games" element={<GamesScreen />} />
                    {/* Add more routes as needed */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;