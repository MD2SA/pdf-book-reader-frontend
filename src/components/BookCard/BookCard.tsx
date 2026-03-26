import type { Book } from '../../types/book';
import { useNavigate } from 'react-router-dom';
import styles from './BookCard.module.css';

interface BookCardProps {
    book: Book;
    isFeatured?: boolean;
}

export function BookCard({ book, isFeatured = false }: BookCardProps) {
    const navigate = useNavigate();

    const rootClass = isFeatured
        ? `${styles.bookCard} ${styles.featured}`
        : styles.bookCard;

    return (
        <div className={rootClass}>
            <div className={styles.coverContainer}>
                <div className={styles.coverPlaceholder}>
                    <span>{book.title.charAt(0)}</span>
                </div>
            </div>
            <div className={styles.info}>
                <h3 className={styles.title} title={book.title}>{book.title}</h3>
                <div className={styles.metaGroup}>
                    <p className={styles.meta}>
                        Read: {new Date(book.lastRead).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </p>
                    <p className={styles.meta}>Page {book.lastPage}</p>
                </div>
                <button
                    className={styles.continueBtn}
                    onClick={() => navigate(`/reader/${book.id}`, { state: { book } })}
                >
                    {isFeatured ? 'Continue Reading' : 'Continue'}
                </button>
            </div>
        </div>
    );
};
