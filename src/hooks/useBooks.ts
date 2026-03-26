import { useEffect, useState } from 'react';
import type { Book } from '../types/book';
import { getBooks } from '../services/bookService';

interface UseBooksResult {
    books: Book[];
    loading: boolean;
    error: string | null;
}

export function useBooks(): UseBooksResult {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        getBooks()
            .then((sorted) => {
                if (!cancelled) {
                    setBooks(sorted);
                }
            })
            .catch((err: Error) => {
                if (!cancelled) {
                    console.error('Failed to load books:', err);
                    setError('Unable to load your library. Please try again later.');
                }
            })
            .finally(() => {
                if (!cancelled) {
                    setLoading(false);
                }
            });

        return () => {
            cancelled = true;
        };
    }, []);

    return { books, loading, error };
}
