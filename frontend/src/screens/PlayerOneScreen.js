import React, { useEffect, useState } from 'react'
import supabase from '../utils/supabase'
import PlayerCard from '../components/PlayerCard'
import '../styles/PlayerOneScreen.css';

function PlayerOneScreen() {
    const [player, setPlayer] = useState(null)

    useEffect(() => {
        fetchPlayer()
    }, [])

    async function fetchPlayer() {
        // Assuming you have a way to get the current player's ID
        const playerId = 7   // Replace with actual player ID or fetch from auth
        const { data, error } = await supabase
            .from('players')
            .select('*')
            .eq('id', playerId)
            .single()

        if (error) console.log('error', error)
        else setPlayer(data)
    }

    if (!player) return <div>Loading...</div>

    return (
        <div>
            <h1>Player Profile</h1>
            <PlayerCard player={player} />
        </div>
    )
}

export default PlayerOneScreen