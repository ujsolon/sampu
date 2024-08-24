// components/Layout.js
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Layout.module.css';

export default function Layout({ children }) {
    const router = useRouter();

    const navItems = [
        { path: '/', icon: 'fas fa-home' },
        { path: '/court', icon: 'fas fa-solid fa-building' },
        { path: '/game', icon: 'fas fa-basketball-ball' },
        { path: '/player/info', icon: 'fas fa-user' },
    ];

    return (
        <div className={styles.layout}>
            <nav className={styles.nav}>
                <div className={styles.navItemsContainer}>
                    {navItems.map((item) => (
                        <Link
                            href={item.path}
                            key={item.path}
                            className={`${styles.navItem} ${router.pathname === item.path ? styles.activeNavItem : ''}`}
                        >
                            <span className={styles.navIcon}>
                                <i className={item.icon}></i>
                            </span>
                        </Link>
                    ))}
                </div>
            </nav>
            <main className={styles.main}>{children}</main>
        </div>
    );
}