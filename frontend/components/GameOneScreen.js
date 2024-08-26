import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import styles from '../styles/GameOneScreen.module.css';
import Layout from '../components/Layout';
import { formatDistanceToNow, parseISO, addHours } from 'date-fns';

export function updateTimeInfo(gameDetails) {
    const now = new Date();

    // Parse the UTC date and time from the database
    const gameTimeUTC = parseISO(`${gameDetails.date}T${gameDetails.time}`);

    // Convert UTC to local time
    const userTimezoneOffset = new Date().getTimezoneOffset() / 60;
    const gameTimeLocal = addHours(gameTimeUTC, -userTimezoneOffset);

    const timeString = formatDistanceToNow(gameTimeLocal, { addSuffix: true });

    if (gameDetails.status === 'open') {
        if (gameTimeLocal > now) {
            return `Starting ${timeString}`;
        } else {
            return `Started ${timeString}`;
        }
    } else if (gameDetails.status === 'finished') {
        return `Ended ${timeString}`;
    }

    return timeString;
}

function TeamBox({
    players,
    team,
    teamName,
    onRegister,
    onUnregister,
    playerRegistered,
    isClickable,
    isGameFinished,
    isEditingName,
    setIsEditingName,
    onTeamNameUpdate
}) {
    const teamClass = team === 'team_1' ? styles.team1 : styles.team2;

    return (
        <div className={styles.teamBoxWrapper}>
            <div
                className={`${styles.teamBox} ${teamClass} ${!isClickable || isGameFinished ? styles.nonClickableTeam : ''}`}
                onClick={() => isClickable && !playerRegistered && !isGameFinished && onRegister(team)}
            >
                <div className={styles.playerAvatarsContainer}>
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
                </div>
                {playerRegistered === team && (
                    <button className={styles.unregisterButton} onClick={(e) => {
                        e.stopPropagation();
                        onUnregister();
                    }}>
                        &times;
                    </button>
                )}
            </div>
            {isEditingName ? (
                <input
                    type="text"
                    value={teamName}
                    onChange={(e) => onTeamNameUpdate(team, e.target.value)}
                    onBlur={() => setIsEditingName(false)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            setIsEditingName(false);
                        }
                    }}
                    autoFocus
                    className={styles.teamNameInput}
                />
            ) : (
                <p
                    className={styles.teamName}
                    onDoubleClick={() => setIsEditingName(true)}
                    style={{ cursor: 'pointer' }}
                    title="Double-click to edit"
                >
                    {teamName}
                </p>
            )}
        </div>
    );
}

const GameOneScreen = ({ gameId }) => {
    const [gameDetails, setGameDetails] = useState(null);
    const [playerRegistered, setPlayerRegistered] = useState(null);
    const [currentPlayer, setCurrentPlayer] = useState(null);
    const [timeInfo, setTimeInfo] = useState('');
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingTeam1Name, setIsEditingTeam1Name] = useState(false);
    const [isEditingTeam2Name, setIsEditingTeam2Name] = useState(false);

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
            const updateTime = () => setTimeInfo(updateTimeInfo(gameDetails));
            updateTime(); // Initial update
            const timer = setInterval(updateTime, 60000); // Update every minute
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

    async function handleGameNameUpdate(newName) {
        const { data, error } = await supabase
            .from('games')
            .update({ game_name: newName })
            .eq('id', gameId);

        if (error) console.error('Error updating game name:', error);
        else {
            setGameDetails({ ...gameDetails, game_name: newName });
            setIsEditingName(false);
        }
    }

    const handleTeamNameUpdate = (team, newName) => {
        // Update the local state with the new team name
        setGameDetails(prevDetails => ({
            ...prevDetails,
            [team === 'team_1' ? 'team_1_name' : 'team_2_name']: newName
        }));

        // Call handleSubmit to persist the change
        handleSubmit(team, newName);
    };

    const handleSubmit = async (team, newName) => {
        // Prepare the update object
        const updateData = team === 'team_1' ? { team_1_name: newName } : { team_2_name: newName };

        // Update the corresponding team name in the database
        const { data, error } = await supabase
            .from('games')
            .update(updateData)
            .eq('id', gameId);

        if (error) {
            console.error('Error updating team names:', error);
        } else {
            console.log('Team names updated successfully');
            // Optionally refetch game details if you want to ensure UI consistency
            fetchGameDetails();
        }
    };

    if (!gameDetails) return <div>Loading...</div>;

    const team1Players = gameDetails.games_players.filter(p => p.team === 'team_1');
    const team2Players = gameDetails.games_players.filter(p => p.team === 'team_2');
    const isGameFinished = gameDetails.status === 'finished';

    return (
        <Layout>
            <div className={`${styles.gameScreen} ${isGameFinished ? styles.finishedGame : styles.openGame}`}>
                <div className={styles.gameInfo}>
                    {isEditingName ? (
                        <input
                            type="text"
                            value={gameDetails.game_name}
                            onChange={(e) => setGameDetails({ ...gameDetails, game_name: e.target.value })}
                            onBlur={() => handleGameNameUpdate(gameDetails.game_name)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleGameNameUpdate(gameDetails.game_name);
                                }
                            }}
                            autoFocus
                            className={styles.gameNameInput}
                        />
                    ) : (
                        <h2
                            onDoubleClick={() => setIsEditingName(true)}
                            style={{ cursor: 'pointer' }}
                            title="Double-click to edit"
                        >
                            {gameDetails.game_name}
                        </h2>
                    )}
                    <p className={styles.courtInfo}>
                        {gameDetails.courts.name} ({new Date(`${gameDetails.date}T${gameDetails.time}`).toLocaleString()})
                    </p>
                    <p className={styles.timeInfo}>{timeInfo}</p>
                    <span className={styles.statusBadge}>
                        {gameDetails.status.charAt(0).toUpperCase() + gameDetails.status.slice(1)}
                    </span>
                </div>

                <div className={styles.teamsContainer}>
                    <TeamBox
                        players={team1Players.map(p => p.players)}
                        team="team_1"
                        teamName={gameDetails.team_1_name}
                        onRegister={handleRegister}
                        onUnregister={handleUnregister}
                        playerRegistered={playerRegistered}
                        isClickable={!playerRegistered || playerRegistered === 'team_1'}
                        isGameFinished={isGameFinished}
                        isEditingName={isEditingTeam1Name}
                        setIsEditingName={setIsEditingTeam1Name}
                        onTeamNameUpdate={handleTeamNameUpdate}
                    />
                    <TeamBox
                        players={team2Players.map(p => p.players)}
                        team="team_2"
                        teamName={gameDetails.team_2_name}
                        onRegister={handleRegister}
                        onUnregister={handleUnregister}
                        playerRegistered={playerRegistered}
                        isClickable={!playerRegistered || playerRegistered === 'team_2'}
                        isGameFinished={isGameFinished}
                        isEditingName={isEditingTeam2Name}
                        setIsEditingName={setIsEditingTeam2Name}
                        onTeamNameUpdate={handleTeamNameUpdate}
                    />
                </div>
            </div>
        </Layout>
    );
};

export default GameOneScreen;