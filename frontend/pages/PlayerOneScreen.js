import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase'
import PlayerCard from '../components/PlayerCard';
import styles from '../styles/PlayerOneScreen.module.css';
import Link from 'next/link';

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
        <div className={styles.playerScreen}>
            <h1 className={styles.screenH2}>Player Profile</h1>
            <Link href="/add-player" className={styles.addButton}>Add Player</Link>
            <PlayerCard player={player} className={styles.playerCard} />
        </div>
    );
}
