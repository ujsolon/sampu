import { useEffect, useState } from 'react';
import Link from 'next/link';
import supabase from '../utils/supabase';
import styles from '../styles/HomeScreen.module.css'; // Import the CSS module

export default function HomeScreen() {
    const [stats, setStats] = useState({
        playerCount: 0,
        courtCount: 0,
        gameCount: 0
    });

    useEffect(() => {
        fetchStats();
    }, []);

    async function fetchStats() {
        try {
            const [playerCount, courtCount, gameCount] = await Promise.all([
                supabase.from('players').select('id', { count: 'exact', head: true }),
                supabase.from('courts').select('id', { count: 'exact', head: true }),
                supabase.from('games').select('id', { count: 'exact', head: true })
            ]);

            setStats({
                playerCount: playerCount.count,
                courtCount: courtCount.count,
                gameCount: gameCount.count
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    }

    return (
        <div className={styles.homeScreen}> {/* Use class from CSS module */}
            <h1>Welcome to the Sports App</h1>
            <div className={styles.stats}>
                <p>Total Players: {stats.playerCount}</p>
                <p>Total Courts: {stats.courtCount}</p>
                <p>Total Games: {stats.gameCount}</p>
            </div>
            <div className={styles.navLinks}>
                <Link href="/CourtManyScreen" className={styles.navLink}>Courts</Link>
                <Link href="/GameManyScreen" className={styles.navLink}>Games</Link>
                <Link href="/PlayerOneScreen" className={styles.navLink}>Player Info</Link>
            </div>
        </div>
    );
}
