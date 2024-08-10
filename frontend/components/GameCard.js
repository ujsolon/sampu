import Link from 'next/link';
import { formatDistanceToNow, parseISO } from 'date-fns';
import styles from '../styles/GameCard.module.css';

function GameCard({ game }) {
    const gameDateTime = parseISO(`${game.date}T${game.time}`);
    const elapsedTime = formatDistanceToNow(gameDateTime, { addSuffix: true });

    return (
        <Link href={`/game/${game.id}`}>
            <div className={styles.gameCard}>
                <h2>{game.id}</h2>
                <p>Date: {game.time}</p>
                <p>Status: {game.status}</p>
                <p>Elapsed Time: {elapsedTime}</p>
            </div>
        </Link>
    );
}

export default GameCard;
