import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabase';
import { signOut } from '../utils/auth';
import styles from '../styles/HomeScreen.module.css';
import Layout from '../components/Layout';

export default function HomeScreen() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        checkUser();
    }, []);

    async function checkUser() {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        if (!user) {
            router.push('/login');
        }
    }

    const handleSignOut = async () => {
        await signOut();
        router.push('/login');
    };

    if (!user) return null;

    return (
        <Layout>
            <div className={styles.homeScreen}>
                <header className={styles.header}>
                    <h1>Sampu</h1>
                    <button onClick={handleSignOut} className={styles.signOutButton}>Sign Out</button>
                </header>

                <main className={styles.main}>
                    <div className={styles.welcomeCard}>
                        <h2>Welcome, {user.email}!</h2>
                    </div>

                    <div className={styles.cardContainer}>
                        {/* ... (rest of your card components) ... */}
                    </div>
                </main>
            </div>
        </Layout>
    );
}