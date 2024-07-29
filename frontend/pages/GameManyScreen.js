import { useEffect, useState } from 'react';
import supabase from '../utils/supabase';
import GameCard from '../components/GameCard'; // Make sure this path is correct
import styles from '../styles/GameManyScreen.module.css'; // Import the CSS Module

export default function GameManyScreen() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetchGames();
    }, []);

    async function fetchGames() {
        const { data, error } = await supabase
            .from('games')
            .select('*');

        if (error) console.log('error', error);
        else setGames(data);
    }

    return (
        <div className={styles.gameScreen}>
            <h1 className={styles.screenH2}>Games</h1>
            <div className={styles.gameList}>
                {games.map(game => (
                    <GameCard key={game.id} game={game} />
                ))}
            </div>
        </div>
    );
}
