import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import CourtManyScreen from './screens/CourtManyScreen';
import GameManyScreen from './screens/GameManyScreen';
import PlayerOneScreen from './screens/PlayerOneScreen';

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/courts" element={<CourtManyScreen />} />
            <Route path="/games" element={<GameManyScreen />} />
            <Route path="/player" element={<PlayerOneScreen />} />
        </Routes>
    );
}

export default App;