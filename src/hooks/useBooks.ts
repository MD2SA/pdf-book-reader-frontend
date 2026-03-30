import { useEffect, useState } from 'react';
import type { Book } from '../types/book';
import { getBooks } from '../services/bookService';

interface UseBooksResult {
    books: Book[];
    loading: boolean;
    error: string | null;
    refresh: () => Promise<void>;
}

export function useBooks(): UseBooksResult {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const refresh = async () => {
        setLoading(true);
        try {
            const sorted = await getBooks();
            setBooks(sorted);
            setError(null);
        } catch (err: any) {
            console.error('Failed to load books:', err);
            setError('Unable to load your library. Please try again later.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        refresh();
    }, []);

    return { books, loading, error, refresh };
}
