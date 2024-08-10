import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabase';
import styles from '../styles/AddGame.module.css';

export default function AddGame() {
    const [courtId, setCourtId] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [status, setStatus] = useState('open');
    const [player, setPlayer] = useState(null);
    const [courts, setCourts] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchPlayerAndCourts = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/login');
                return;
            }

            const { data: playerData, error: playerError } = await supabase
                .from('players')
                .select('*')
                .eq('email', user.email)
                .single();

            if (playerError) {
                console.error('Error fetching player:', playerError);
                setError('Error fetching player data');
                return;
            }

            if (playerData) {
                setPlayer(playerData);
            } else {
                setError('Player not found');
                return;
            }

            const { data: courtsData, error: courtsError } = await supabase
                .from('courts')
                .select('id, name');

            if (courtsError) {
                console.error('Error fetching courts:', courtsError);
                setError('Error fetching courts data');
            } else {
                setCourts(courtsData);
            }
        };

        fetchPlayerAndCourts();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        setError('');
        setSuccess('');

        if (!player) {
            setError('Player not authenticated');
            return;
        }

        const { data, error } = await supabase
            .from('games')
            .insert([{
                court_id: courtId,
                date,
                time,
                status,
                created_by: player.id
            }]);

        if (error) {
            console.error('Error adding game:', error);
            setError('Failed to add game. Please try again.');
        } else {
            setSuccess('Game added successfully!');
            setTimeout(() => router.push('/GameManyScreen'), 2000);
        }
    }

    if (!player) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.formContainer}>
            <h1>Add Game</h1>
            {error && <p className={styles.error}>{error}</p>}
            {success && <p className={styles.success}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <select
                    value={courtId}
                    onChange={(e) => setCourtId(e.target.value)}
                    required
                >
                    <option value="">Select a court</option>
                    {courts.map(court => (
                        <option key={court.id} value={court.id}>{court.name}</option>
                    ))}
                </select>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                />
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                >
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="finished">Finished</option>
                    <option value="cancelled">Cancelled</option>
                </select>
                <button type="submit">Add Game</button>
            </form>
        </div>
    );
}