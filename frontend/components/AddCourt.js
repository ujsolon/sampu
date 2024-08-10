import { useState } from 'react';
import { supabase } from '../utils/supabase';
import styles from '../styles/AddCourt.module.css';

export default function AddCourt() {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [status, setStatus] = useState('available');

    async function handleSubmit(event) {
        event.preventDefault();

        const { data, error } = await supabase
            .from('courts')
            .insert([{ name, location, status }]);

        if (error) {
            console.error('Error adding court:', error);
        } else {
            console.log('Court added:', data);
            // Optionally redirect or give feedback to the user
        }
    }

    return (
        <div className={styles.formContainer}>
            <h1>Add Court</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Court Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                />
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    required
                >
                    <option value="available">Available</option>
                    <option value="applying">Applying</option>
                    <option value="no_owner">No Owner</option>
                    <option value="closed">Closed</option>
                </select>
                <button type="submit">Add Court</button>
            </form>
        </div>
    );
}
