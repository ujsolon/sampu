import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import styles from '../styles/GameOneScreen.module.css';

function TeamBox({ players, team, onRegister, onUnregister, playerRegistered }) {
    const outlineClass = team === 'team_1' ? styles.outlineRed : styles.outlineBlue;
    const grayedOut = playerRegistered && playerRegistered !== team;

    return (
        <div
            className={`${styles.teamBox} ${grayedOut ? styles.grayedOut : ''}`}
            onClick={() => !playerRegistered && onRegister(team)}
        >
            {players.map((player, index) => (
                <div key={index} className={outlineClass}>
                    <div className={styles.tooltip}>{player.name}</div>
                </div>
            ))}
            {playerRegistered === team && (
                <button className={styles.unregisterButton} onClick={onUnregister}>
                    &times;
                </button>
            )}
        </div>
    );
}

const GameOneScreen = ({ gameId }) => {
    const [gameDetails, setGameDetails] = useState(null);
    const [playerRegistered, setPlayerRegistered] = useState(null);
    const [currentPlayer, setCurrentPlayer] = useState(null);

    useEffect(() => {
        fetchGameDetails();
        fetchCurrentPlayer();
    }, [gameId]);

    async function fetchCurrentPlayer() {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            const { data, error } = await supabase
                .from('players')
                .select('*')
                .eq('email', user.email)
                .single();

            if (error) console.error('Error fetching current player:', error);
            else setCurrentPlayer(data);
        }
    }

    async function fetchGameDetails() {
        const { data, error } = await supabase
            .from('games')
            .select(`
                *,
                games_players!game_players_game_id_fkey(
                    player_id,
                    team,
                    players!game_players_player_id_fkey(name)
                ),
                courts(name)
            `)
            .eq('id', gameId)
            .single();

        if (error) console.error('Error fetching game details:', error);
        else {
            setGameDetails(data);
            // Check if the current player is registered
            if (currentPlayer) {
                const playerRegistration = data.games_players.find(p => p.player_id === currentPlayer.id);
                setPlayerRegistered(playerRegistration ? playerRegistration.team : null);
            }
        }
    }

    async function handleRegister(team) {
        if (!currentPlayer) {
            console.error('No current player found');
            return;
        }

        const { data, error } = await supabase
            .from('games_players')
            .insert([{ game_id: gameDetails.id, player_id: currentPlayer.id, team }]);

        if (error) console.error('Error registering for the game:', error);
        else {
            fetchGameDetails();
            setPlayerRegistered(team);
        }
    }

    async function handleUnregister() {
        if (!currentPlayer) {
            console.error('No current player found');
            return;
        }

        const { data, error } = await supabase
            .from('games_players')
            .delete()
            .eq('game_id', gameDetails.id)
            .eq('player_id', currentPlayer.id);

        if (error) console.error('Error unregistering from the game:', error);
        else {
            fetchGameDetails();
            setPlayerRegistered(null);
        }
    }

    if (!gameDetails) return <div>Loading...</div>;

    const team1Players = gameDetails.games_players.filter(p => p.team === 'team_1');
    const team2Players = gameDetails.games_players.filter(p => p.team === 'team_2');

    return (
        <div className={styles.gameScreen}>
            <h2>Court: {gameDetails.courts.name}</h2>
            <p>Date: {gameDetails.date}</p>
            <p>Time: {gameDetails.time}</p>
            <p>Status: {gameDetails.status}</p>

            <div className={styles.teamsContainer}>
                <TeamBox
                    players={team1Players.map(p => p.players)}
                    team="team_1"
                    onRegister={handleRegister}
                    onUnregister={handleUnregister}
                    playerRegistered={playerRegistered}
                />
                <TeamBox
                    players={team2Players.map(p => p.players)}
                    team="team_2"
                    onRegister={handleRegister}
                    onUnregister={handleUnregister}
                    playerRegistered={playerRegistered}
                />
            </div>
        </div>
    );
};

export default GameOneScreen;