import React, { useEffect, useState } from 'react'
import supabase from '../utils/supabase'
import GameCard from '../components/GameCard'
import '../styles/GameManyScreen.css';

function GameManyScreen() {
    const [games, setGames] = useState([])

    useEffect(() => {
        fetchGames()
    }, [])

    async function fetchGames() {
        const { data, error } = await supabase
            .from('games')
            .select(`
        *,
        court:courts(name),
        creator:players(name)
      `)

        if (error) console.log('error', error)
        else setGames(data)
    }

    return (
        <div>
            <h1>Games</h1>
            {games.map(game => (
                <GameCard key={game.id} game={game} />
            ))}
        </div>
    )
}

export default GameManyScreen