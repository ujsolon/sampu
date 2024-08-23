import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import GameCard from '../components/GameCard';
import styles from '../styles/GameManyScreen.module.css';
import Link from 'next/link';
import Layout from '../components/Layout';

function getTimeDifference(gameDate, gameTime) {
    const gameDateTime = new Date(`${gameDate}T${gameTime}`);
    const currentDateTime = new Date();
    return Math.abs(gameDateTime - currentDateTime);
}

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

            // Sort games by their proximity to the current datetime
            allGamesData.sort((a, b) => {
                return getTimeDifference(a.date, a.time) - getTimeDifference(b.date, b.time);
            });

            // Get the 6 closest games
            const closestGames = allGamesData.slice(0, 6);

            const myGamesData = closestGames.filter(game => myGameIds.includes(game.id));
            const otherGamesData = closestGames.filter(game => !myGameIds.includes(game.id));

            setMyGames(myGamesData);
            setOtherGames(otherGamesData);
        } else {
            console.error('No authenticated user');
        }
    }

    return (
        <Layout>
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
                                    grayedOut={game.status === 'closed'}
                                />
                            ))
                        ) : (
                            <p className={styles.noGamesMessage}>No games available.</p>
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
                                    grayedOut={game.status === 'closed'}
                                />
                            ))
                        ) : (
                            <p className={styles.noGamesMessage}>No games available.</p>
                        )}
                    </div>
                </section>
            </div>
        </Layout>
    );
}
