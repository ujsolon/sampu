import Link from 'next/link';
import styles from '../styles/GameCard.module.css';
import { updateTimeInfo } from './GameOneScreen'; // Adjust the import path as needed

function GameCard({ game }) {
    const timeInfo = updateTimeInfo(game);

    // Determine the className based on game status
    const cardClassName =
        game.status === 'in_progress' ? `${styles.gameCard} ${styles.inProgressGame}` :
            game.status === 'finished' ? `${styles.gameCard} ${styles.finishedGame}` :
                `${styles.gameCard} ${styles.openGame}`;

    return (
        <Link href={`/game/${game.id}`} className={styles.gameCardLink}>
            <div className={cardClassName}>
                <div className={styles.gameId}>#{game.id}</div>
                <h3 className={styles.gameName}>{game.game_name || 'Game Name'}</h3>
                <p className={styles.courtInfo}>{game.courts.name}</p>
                <p className={styles.dateTime}>{new Date(game.date + 'T' + game.time).toLocaleString()}</p>
                <p className={styles.timeInfo}>{timeInfo}</p>
            </div>
        </Link>
    );
}

export default GameCard;