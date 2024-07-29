import { useEffect, useState } from 'react';
import supabase from '../utils/supabase';
import GameCard from '../components/GameCard';
import styles from '../styles/GameManyScreen.module.css';
import Link from 'next/link';

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
            <Link href="/add-game" className={styles.addButton}>Add Game</Link>
            <div className={styles.gameList}>
                {games.map(game => (
                    <GameCard key={game.id} game={game} className={styles.gameCard} />
                ))}
            </div>
        </div>
    );
}
