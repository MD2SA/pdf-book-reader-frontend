import { BookCard } from '../../components/BookCard';
import { useBooks } from '../../hooks/useBooks';
import { useAuth } from '../../context/AuthContext';
import styles from './Home.module.css';

export default function Home() {
    const { books, error } = useBooks();
    const { user, logout } = useAuth();

    const featuredBook = books[0];
    const otherBooks = books.slice(1);

    return (
        <div className={`container ${styles.homeContainer} fade-in`}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>PDF Book Reader</h1>
                    <p className={styles.subtitle}>Digital Library System</p>
                </div>

                <div className={styles.userProfile}>
                    <div className={styles.userInfo}>
                        <span className={styles.userName}>{user?.username}</span>
                    </div>
                    <button className={styles.logoutButton} onClick={logout}>
                        Sign Out
                    </button>
                </div>
            </header>

            <main>
                {error && <div className={styles.errorMessage}>{error}</div>}

                <section className={styles.sectionMargin}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionLabel}>Current Reading</h2>
                    </div>
                    {featuredBook ? (
                        <div className={`card ${styles.featuredCard}`}>
                            <BookCard book={featuredBook} isFeatured={true} />
                        </div>
                    ) : (
                        <div className={styles.emptyState}>
                            {error ? 'Error loading repository.' : 'No active books in repository.'}
                        </div>
                    )}
                </section>

                <section>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionLabel}>Library Index</h2>
                    </div>
                    <div className={styles.booksGrid}>
                        {otherBooks.map((book) => (
                            <div key={book.id} className={`card ${styles.gridItem}`}>
                                <BookCard book={book} />
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
