import { useState } from 'react';
import supabase from '../utils/supabase';
import styles from '../styles/AddPlayer.module.css';

export default function AddPlayer() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('active');

    async function handleSubmit(event) {
        event.preventDefault();

        const { data, error } = await supabase
            .from('players')
            .insert([{ name, email, status }]);

        if (error) {
            console.error('Error adding player:', error);
        } else {
            console.log('Player added:', data);
            // Optionally redirect or give feedback to the user
        }
    }

    return (
        <div className={styles.formContainer}>
            <h1>Add Player</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                >
                    <option value="active">Active</option>
                    <option value="locked">Locked</option>
                </select>
                <button type="submit">Add Player</button>
            </form>
        </div>
    );
}
