import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase'
import CourtCard from '../components/CourtCard';
import styles from '../styles/CourtManyScreen.module.css';
import Link from 'next/link';

export default function CourtManyScreen() {
    const [courts, setCourts] = useState([]);

    useEffect(() => {
        fetchCourts();
    }, []);

    async function fetchCourts() {
        const { data, error } = await supabase
            .from('courts')
            .select('*');

        if (error) console.log('error', error);
        else setCourts(data);
    }

    return (
        <div className={styles.courtsScreen}>
            <h1 className={styles.screenH2}>Courts</h1>
            <Link href="/add-court" className={styles.addButton}>Add Court</Link>
            <div className={styles.courtList}>
                {courts.map(court => (
                    <CourtCard key={court.id} court={court} className={styles.courtCard} />
                ))}
            </div>
        </div>
    );
}