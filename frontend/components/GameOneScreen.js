import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import styles from '../styles/GameOneScreen.module.css';

export function GameOneScreen({ gameId }) {
    const [game, setGame] = useState(null);
    const [player, setPlayer] = useState(null);
    const [isRegistered, setIsRegistered] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchGameAndPlayer = async () => {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) {
                    setError('Please log in to view this page.');
                    setLoading(false);
                    return;
                }

                const { data: playerData, error: playerError } = await supabase
                    .from('players')
                    .select('*')
                    .eq('email', user.email)
                    .single();

                if (playerError || !playerData) {
                    setError('Player not found.');
                    setLoading(false);
                    return;
                }

                setPlayer(playerData);

                const { data: gameData, error: gameError } = await supabase
                    .from('games')
                    .select('*')
                    .eq('id', gameId)
                    .single();

                if (gameError || !gameData) {
                    setError('Game not found.');
                    setLoading(false);
                    return;
                }

                setGame(gameData);

                const { data: registrationData } = await supabase
                    .from('games_players')
                    .select('*')
                    .eq('game_id', gameId)
                    .eq('player_id', playerData.id)
                    .single();

                setIsRegistered(!!registrationData);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('An unexpected error occurred.');
                setLoading(false);
            }
        };

        if (gameId) {
            fetchGameAndPlayer();
        }
    }, [gameId]);

    const handleRegister = async () => {
        try {
            if (isRegistered) {
                const { error } = await supabase
                    .from('games_players')
                    .delete()
                    .eq('game_id', gameId)
                    .eq('player_id', player.id);

                if (error) throw error;
                setIsRegistered(false);
            } else {
                const { error } = await supabase
                    .from('games_players')
                    .insert({ game_id: gameId, player_id: player.id });

                if (error) throw error;
                setIsRegistered(true);
            }
        } catch (err) {
            console.error('Error updating registration status:', err);
            setError('Failed to update registration. Please try again.');
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className={styles.gameContainer}>
            <h1>Game Details</h1>
            <p>ID: {game.id}</p>
            <p>Date: {game.date}</p>
            <p>Time: {game.time}</p>
            <p>Status: {game.status}</p>
            <button onClick={handleRegister}>
                {isRegistered ? 'Unregister' : 'Register'}
            </button>
        </div>
    );
}
