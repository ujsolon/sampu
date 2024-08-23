import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import GameCard from '../components/GameCard';
import styles from '../styles/GameManyScreen.module.css';
import Link from 'next/link';

export default function GameManyScreen() {
    const [myGames, setMyGames] = useState([]);
    const [otherGames, setOtherGames] = useState([]);
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        fetchPlayerAndGames();
    }, []);

    async function fetchPlayerAndGames() {
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
            const { data: playerData, error: playerError } = await supabase
                .from('players')
                .select('*')
                .eq('email', user.email)
                .single();

            if (playerError) {
                console.error('Error fetching player:', playerError);
                return;
            }

            setPlayer(playerData);

            const { data: gamePlayerData, error: gamePlayerError } = await supabase
                .from('games_players')
                .select('game_id')
                .eq('player_id', playerData.id);

            if (gamePlayerError) {
                console.error('Error fetching player games:', gamePlayerError);
                return;
            }

            const myGameIds = gamePlayerData.map(record => record.game_id);

            const { data: allGamesData, error: allGamesError } = await supabase
                .from('games')
                .select('*, courts(name, location)');

            if (allGamesError) {
                console.error('Error fetching all games:', allGamesError);
                return;
            }

            // Sort games by date and time
            allGamesData.sort((a, b) => {
                const dateA = new Date(`${a.date}T${a.time}`);
                const dateB = new Date(`${b.date}T${b.time}`);
                return dateA - dateB;
            });

            const myGamesData = allGamesData.filter(game => myGameIds.includes(game.id));
            const otherGamesData = allGamesData.filter(game => !myGameIds.includes(game.id));

            setMyGames(myGamesData);
            setOtherGames(otherGamesData);
        } else {
            console.error('No authenticated user');
        }
    }

    return (
        <div className={styles.gameScreen}>
            <h1 className={styles.screenH2}>Games</h1>
            <Link href="/add-game" className={styles.addButton}>Add Game</Link>

            <section>
                <h2 className={styles.sectionTitle}>My Games</h2>
                <div className={styles.gameList}>
                    {myGames.length > 0 ? (
                        myGames.map(game => (
                            <GameCard
                                key={game.id}
                                game={game}
                                className={`${styles.gameCard} ${game.status === 'finished' ? styles.finishedGame : styles.openGame}`}
                                grayedOut={game.status === 'closed'} // Apply gray out if game is closed
                            />
                        ))
                    ) : (
                        <p className={styles.noGamesMessage}>You are not in any games.</p>
                    )}
                </div>
            </section>

            <section>
                <h2 className={styles.sectionTitle}>Other Games</h2>
                <div className={styles.gameList}>
                    {otherGames.length > 0 ? (
                        otherGames.map(game => (
                            <GameCard
                                key={game.id}
                                game={game}
                                className={`${styles.gameCard} ${game.status === 'finished' ? styles.finishedGame : styles.openGame}`}
                                grayedOut={game.status === 'closed'} // Apply gray out if game is closed
                            />
                        ))
                    ) : (
                        <p className={styles.noGamesMessage}>No other games available.</p>
                    )}
                </div>
            </section>
        </div>
    );
}
