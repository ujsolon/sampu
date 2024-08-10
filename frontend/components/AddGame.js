import { useState } from 'react';
import { supabase } from '../utils/supabase';
import styles from '../styles/AddGame.module.css';

export default function AddGame() {
    const [courtId, setCourtId] = useState('');
    const [time, setTime] = useState('');
    const [status, setStatus] = useState('open');

    async function handleSubmit(event) {
        event.preventDefault();

        const { data, error } = await supabase
            .from('games')
            .insert([{ court_id: courtId, time, status }]);

        if (error) {
            console.error('Error adding game:', error);
        } else {
            console.log('Game added:', data);
            // Optionally redirect or give feedback to the user
        }
    }

    return (
        <div className={styles.formContainer}>
            <h1>Add Game</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    placeholder="Court ID"
                    value={courtId}
                    onChange={(e) => setCourtId(e.target.value)}
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
