import { useRouter } from 'next/router';
import { GameOneScreen } from '../../components/GameOneScreen';

export default function GamePage() {
    const router = useRouter();
    const { id } = router.query;
    console.log('Game ID:', id);  // Add this line

    return <GameOneScreen gameId={id} />;
}