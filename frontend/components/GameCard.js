import Link from 'next/link';
import { formatDistanceToNow, parseISO } from 'date-fns';
import styles from '../styles/GameCard.module.css';

function GameCard({ game }) {
    const gameDateTime = parseISO(`${game.date}T${game.time}`);
    const elapsedTime = formatDistanceToNow(gameDateTime, { addSuffix: true });

    // Determine the className based on game status
    const cardClassName =
        game.status === 'in_progress' ? `${styles.gameCard} ${styles.inProgressGame}` :
            game.status === 'finished' ? `${styles.gameCard} ${styles.finishedGame}` :
                `${styles.gameCard} ${styles.openGame}`;

    return (
        <Link href={`/game/${game.id}`} className={cardClassName}>
            <div className={styles.gameId}>{game.id}</div>
            <h3>Court {game.court_id}</h3>
            <p>{game.status === 'finished' ? `Ended ${elapsedTime}` : `Starting in ${elapsedTime}`}</p>
            <p className={styles.status}>{game.status.charAt(0).toUpperCase() + game.status.slice(1)}</p>
        </Link>
    );
}

export default GameCard;
