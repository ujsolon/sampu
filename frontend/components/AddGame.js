import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabase';
import styles from '../styles/AddGame.module.css';

export default function AddGame() {
    const [courtId, setCourtId] = useState('');
    const [time, setTime] = useState('');
    const [status, setStatus] = useState('open');
    const [player, setPlayer] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchPlayer = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/login'); // Redirect to login if not authenticated
            } else {
                // Fetch the player data from your players table
                const { data, error } = await supabase
                    .from('players')
                    .select('*')
                    .eq('email', user.email)
                    .single();

                if (error) {
                    console.error('Error fetching player:', error);
                    return;
                }

                if (data) {
                    setPlayer(data);
                } else {
                    console.error('Player not found');
                    // Handle case where auth user exists but player record doesn't
                }
            }
        };

        fetchPlayer();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();

        if (!player) {
            console.error('Player not authenticated');
            return;
        }

        const { data, error } = await supabase
            .from('games')
            .insert([{
                court_id: courtId,
                time,
                status,
                created_by: player.id // Use the player's id from your players table
            }]);

        if (error) {
            console.error('Error adding game:', error);
        } else {
            console.log('Game added:', data);
            router.push('/GameManyScreen'); // Redirect to game list after adding
        }
    }

    if (!player) {
        return <div>Loading...</div>; // Or any loading indicator
    }

    return (
        <div className={styles.formContainer}>
            <h1>Add Game</h1>
            <form onSubmit={handleSubmit}>
                {/* Example form inputs */}
                <input
                    type="text"
                    value={courtId}
                    onChange={(e) => setCourtId(e.target.value)}
                    placeholder="Court ID"
                    required
                />
                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                />
                <button type="submit">Add Game</button>
            </form>
        </div>
    );
}
