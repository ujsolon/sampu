import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import styles from '../styles/GameOneScreen.module.css';

function TeamBox({ players, team, onRegister, onUnregister, playerRegistered, isClickable, isGameFinished }) {
    const teamClass = team === 'team_1' ? styles.team1 : styles.team2;

    return (
        <div
            className={`${styles.teamBox} ${teamClass} ${!isClickable || isGameFinished ? styles.nonClickableTeam : ''}`}
            onClick={() => isClickable && !playerRegistered && !isGameFinished && onRegister(team)}
        >
            {players.map((player) => (
                <div key={player.id} className={styles.playerAvatarWrapper}>
                    <div className={styles.playerAvatar}>
                        {player.avatar_base64 ? (
                            <img
                                src={`data:image/jpeg;base64,${player.avatar_base64}`}
                                alt={player.name}
                                className={styles.avatarImage}
                            />
                        ) : (
                            <div className={styles.defaultAvatar}>{player.name[0]}</div>
                        )}
                    </div>
                    <span className={styles.tooltip}>{player.name}</span>
                </div>
            ))}
            {playerRegistered === team && (
                <button className={styles.unregisterButton} onClick={(e) => {
                    e.stopPropagation();
                    onUnregister();
                }}>
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
    const [timeInfo, setTimeInfo] = useState('');

    useEffect(() => {
        fetchCurrentPlayer();
    }, [gameId]);

    useEffect(() => {
        if (currentPlayer) {
            fetchGameDetails();
        }
    }, [currentPlayer]);

    useEffect(() => {
        if (gameDetails) {
            updateTimeInfo();
            const timer = setInterval(updateTimeInfo, 60000); // Update every minute
            return () => clearInterval(timer);
        }
    }, [gameDetails]);

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
                    players!game_players_player_id_fkey(id, name, avatar_base64)
                ),
                courts(name)
            `)
            .eq('id', gameId)
            .single();

        if (error) console.error('Error fetching game details:', error);
        else {
            setGameDetails(data);
            // Check if the current player is registered
            const playerRegistration = data.games_players.find(p => p.player_id === currentPlayer.id);
            setPlayerRegistered(playerRegistration ? playerRegistration.team : null);
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

    function updateTimeInfo() {
        const now = new Date();
        const gameTime = new Date(`${gameDetails.date}T${gameDetails.time}`);
        const diffMs = Math.abs(gameTime - now);
        const diffHours = diffMs / 36e5; // Hours difference
        const diffDays = Math.floor(diffHours / 24);

        let timeString;
        if (diffDays > 0) {
            timeString = `${diffDays} day${diffDays > 1 ? 's' : ''}`;
        } else {
            timeString = `${Math.round(diffHours)} hour${Math.round(diffHours) !== 1 ? 's' : ''}`;
        }

        if (gameDetails.status === 'open') {
            if (gameTime > now) {
                setTimeInfo(`Starting in ${timeString}`);
            } else {
                setTimeInfo(`Started ${timeString} ago`);
            }
        } else if (gameDetails.status === 'finished') {
            setTimeInfo(`Ended ${timeString} ago`);
        }
    }

    if (!gameDetails) return <div>Loading...</div>;

    const team1Players = gameDetails.games_players.filter(p => p.team === 'team_1');
    const team2Players = gameDetails.games_players.filter(p => p.team === 'team_2');
    const isGameFinished = gameDetails.status === 'finished';

    return (
        <div className={`${styles.gameScreen} ${isGameFinished ? styles.finishedGame : styles.openGame}`}>
            <div className={styles.gameInfo}>
                <h2>{gameDetails.courts.name}</h2>
                <p className={styles.gameNumber}>Game #{gameDetails.id}</p>
                <p className={styles.timeInfo}>{timeInfo}</p>
                <span className={styles.statusBadge}>
                    {gameDetails.status.charAt(0).toUpperCase() + gameDetails.status.slice(1)}
                </span>
            </div>

            <div className={styles.teamsContainer}>
                <TeamBox
                    players={team1Players.map(p => p.players)}
                    team="team_1"
                    onRegister={handleRegister}
                    onUnregister={handleUnregister}
                    playerRegistered={playerRegistered}
                    isClickable={!playerRegistered || playerRegistered === 'team_1'}
                    isGameFinished={isGameFinished}
                />
                <TeamBox
                    players={team2Players.map(p => p.players)}
                    team="team_2"
                    onRegister={handleRegister}
                    onUnregister={handleUnregister}
                    playerRegistered={playerRegistered}
                    isClickable={!playerRegistered || playerRegistered === 'team_2'}
                    isGameFinished={isGameFinished}
                />
            </div>
        </div>
    );
};

export default GameOneScreen;