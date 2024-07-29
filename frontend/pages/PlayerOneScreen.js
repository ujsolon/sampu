import { useEffect, useState } from 'react';
import supabase from '../utils/supabase';
import PlayerCard from '../components/PlayerCard';
import '../styles/PlayerOneScreen.module.css';

export default function PlayerOneScreen() {
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        fetchPlayer();
    }, []);

    async function fetchPlayer() {
        const playerId = 9; // Replace with actual player ID or fetch from auth
        const { data, error } = await supabase
            .from('players')
            .select('*')
            .eq('id', playerId)
            .single();
        if (error) console.error('Error fetching player:', error);
        else setPlayer(data);
    }

    if (!player) return <div>Loading...</div>;

    return (
        <div>
            <h1>Player Profile</h1>
            <PlayerCard player={player} />
        </div>
    );
}
