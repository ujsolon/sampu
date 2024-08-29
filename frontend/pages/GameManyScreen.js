import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import GameCard from '../components/GameCard';
import styles from '../styles/GameManyScreen.module.css';
import Link from 'next/link';
import Layout from '../components/Layout';

export default function GameManyScreen() {
    const [myUpcomingGames, setMyUpcomingGames] = useState([]);
    const [myPreviousGames, setMyPreviousGames] = useState([]);
    const [otherOpenGames, setOtherOpenGames] = useState([]);
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

            const now = new Date();

            const myUpcoming = allGamesData
                .filter(game => myGameIds.includes(game.id) && game.status === 'open' || game.status === 'in_progress')
                .sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));

            const myPrevious = allGamesData
                .filter(game => myGameIds.includes(game.id) && game.status === 'finished')
                .sort((a, b) => new Date(`${b.date}T${b.time}`) - new Date(`${a.date}T${a.time}`));

            const otherOpen = allGamesData
                .filter(game => !myGameIds.includes(game.id) && game.status === 'open')
                .sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));

            setMyUpcomingGames(myUpcoming);
            setMyPreviousGames(myPrevious);
            setOtherOpenGames(otherOpen);
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
                    <h2 className={styles.sectionTitle}>My Upcoming Games</h2>
                    <div className={styles.gameList}>
                        {myUpcomingGames.length > 0 ? (
                            myUpcomingGames.map(game => (
                                <GameCard
                                    key={game.id}
                                    game={game}
                                    className={`${styles.gameCard} ${styles.openGame}`}
                                />
                            ))
                        ) : (
                            <p className={styles.noGamesMessage}>No upcoming games available.</p>
                        )}
                    </div>
                </section>

                <section>
                    <h2 className={styles.sectionTitle}>My Previous Games</h2>
                    <div className={styles.gameList}>
                        {myPreviousGames.length > 0 ? (
                            myPreviousGames.map(game => (
                                <GameCard
                                    key={game.id}
                                    game={game}
                                    className={`${styles.gameCard} ${styles.finishedGame}`}
                                />
                            ))
                        ) : (
                            <p className={styles.noGamesMessage}>No previous games available.</p>
                        )}
                    </div>
                </section>

                <section>
                    <h2 className={styles.sectionTitle}>Other Open Games</h2>
                    <div className={styles.gameList}>
                        {otherOpenGames.length > 0 ? (
                            otherOpenGames.map(game => (
                                <GameCard
                                    key={game.id}
                                    game={game}
                                    className={`${styles.gameCard} ${styles.openGame}`}
                                />
                            ))
                        ) : (
                            <p className={styles.noGamesMessage}>No other open games available.</p>
                        )}
                    </div>
                </section>
            </div>
        </Layout>
    );
}