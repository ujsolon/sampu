import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../utils/supabase'
import '../styles/HomeScreen.css';

function HomeScreen() {
    const [stats, setStats] = useState({
        playerCount: 0,
        courtCount: 0,
        gameCount: 0
    })

    useEffect(() => {
        fetchStats()
    }, [])

    async function fetchStats() {
        const [playerCount, courtCount, gameCount] = await Promise.all([
            supabase.from('players').select('id', { count: 'exact', head: true }),
            supabase.from('courts').select('id', { count: 'exact', head: true }),
            supabase.from('games').select('id', { count: 'exact', head: true })
        ])

        setStats({
            playerCount: playerCount.count,
            courtCount: courtCount.count,
            gameCount: gameCount.count
        })
    }

    return (
        <div className="home-screen">
            <h1>Welcome to the Sports App</h1>
            <div className="stats">
                <p>Total Players: {stats.playerCount}</p>
                <p>Total Courts: {stats.courtCount}</p>
                <p>Total Games: {stats.gameCount}</p>
            </div>
            <div className="nav-links">
                <Link to="/courts" className="nav-link">Courts</Link>
                <Link to="/games" className="nav-link">Games</Link>
                <Link to="/player" className="nav-link">Player Info</Link>
            </div>
        </div>
    )
}

export default HomeScreen