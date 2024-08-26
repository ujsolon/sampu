import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabase';
import styles from '../styles/GameOneScreen.module.css';
import formStyles from '../styles/AddGame.module.css';
import Layout from '../components/Layout';

export default function AddGame() {
    const [courtId, setCourtId] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [player, setPlayer] = useState(null);
    const [courts, setCourts] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();
    const [duration, setDuration] = useState('');
    const [gameName, setGameName] = useState('New Game');
    const [isEditingName, setIsEditingName] = useState(false);
    const [customDuration, setCustomDuration] = useState(''); // New state for custom duration
    const [durationType, setDurationType] = useState('hours'); // State to handle duration type (hours or minutes)

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

        // Combine date and time input into a single Date object in the local timezone
        const localDateTimeString = `${date}T${time}`;
        const localDateTime = new Date(localDateTimeString);

        // Convert to UTC
        const utcDateTime = new Date(localDateTime.toUTCString());

        // Split date and time in ISO format
        const utcDate = utcDateTime.toISOString().split('T')[0];
        const utcTime = utcDateTime.toISOString().split('T')[1].slice(0, 8);

        // Convert duration to minutes
        let durationInMinutes;
        if (durationType === 'hours') {
            durationInMinutes = parseInt(duration) * 60; // Convert hours to minutes
        } else {
            durationInMinutes = parseInt(customDuration); // Use custom duration in minutes
        }

        const { data, error } = await supabase
            .from('games')
            .insert([{
                court_id: courtId,
                date: utcDate,
                time: utcTime,
                duration: durationInMinutes,
                status: 'open',
                created_by: player.id,
                game_name: gameName
            }]);

        if (error) {
            console.error('Error adding game:', error);
            setError('Failed to add game. Please try again.');
        } else {
            setSuccess('Game added successfully!');
            setCourtId('');
            setDate('');
            setTime('');
            setDuration('');
            setCustomDuration(''); // Reset custom duration
            setTimeout(() => router.push('/GameManyScreen'), 2000);
        }
    }

    if (!player) {
        return <div>Loading...</div>;
    }

    return (
        <Layout>
            <div className={`${styles.gameScreen} ${styles.openGame}`}>
                <div className={styles.gameInfo}>
                    <h2>Add New Game</h2>
                    <h3 className={styles.gameName}>
                        {isEditingName ? (
                            <input
                                type="text"
                                value={gameName}
                                onChange={(e) => setGameName(e.target.value)}
                                onBlur={() => setIsEditingName(false)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        setIsEditingName(false);
                                    }
                                }}
                                autoFocus
                                className={styles.gameNameInput}
                            />
                        ) : (
                            <span
                                style={{
                                    cursor: 'pointer',
                                    borderBottom: '2px dashed #666',
                                    padding: '0 4px'
                                }}
                                title="Double-click to edit"
                                onDoubleClick={() => setIsEditingName(true)}
                            >
                                {gameName}
                            </span>
                        )}
                    </h3>
                </div>

                <div className={`${styles.teamsContainer} ${formStyles.formContainer}`}>
                    <form onSubmit={handleSubmit} className={formStyles.addGameForm}>
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
                        <select
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                        >
                            <option value="">Select a time</option>
                            {generateTimeOptions().map(option => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>

                        <select
                            value={durationType}
                            onChange={(e) => setDurationType(e.target.value)}
                            required
                        >
                            <option value="hours">Select duration in hours</option>
                            {[1, 2, 3, 4, 5].map(hour => (
                                <option key={hour} value={hour}>{hour} hour{hour > 1 ? 's' : ''}</option>
                            ))}
                            <option value="minutes">Other (in minutes)</option>
                        </select>

                        {durationType === 'minutes' && (
                            <input
                                type="number"
                                placeholder="Enter duration in minutes"
                                value={customDuration}
                                onChange={(e) => setCustomDuration(e.target.value)}
                                required
                            />
                        )}

                        <button type="submit">Add Game</button>
                    </form>
                </div>
                {error && <p className={formStyles.error}>{error}</p>}
                {success && <p className={formStyles.success}>{success}</p>}
            </div>
        </Layout>
    );
}

function generateTimeOptions() {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            options.push(time);
        }
    }
    return options;
}
