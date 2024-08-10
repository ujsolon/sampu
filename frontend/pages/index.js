import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabase'  // Adjust the path according to your project structure
import { signOut } from '../utils/auth';
import styles from '../styles/HomeScreen.module.css';

export default function HomeScreen() {
    const [stats, setStats] = useState({
        playerCount: 0,
        courtCount: 0,
        gameCount: 0
    });
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        fetchStats();
        checkUser();
    }, []);

    async function checkUser() {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        if (!user) {
            router.push('/login');
        }
    }

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

    const handleSignOut = async () => {
        await signOut();
        router.push('/login');
    };

    if (!user) return null; // Don't render anything if user is not logged in

    return (
        <div className={styles.homeScreen}>
            <h1>Welcome to the Sports App</h1>
            <p>Hello, {user.email}!</p>
            <button onClick={handleSignOut} className={styles.signOutButton}>Sign Out</button>
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