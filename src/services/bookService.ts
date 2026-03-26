import type { Book } from '../types/book';
import { api } from './api';

export async function getBooks(): Promise<Book[]> {
    const response = await api.get('/books');

    if (!response.ok) {
        throw new Error('Failed to fetch books');
    }

    const data: Book[] = await response.json();

    return [...data].sort(
        (a, b) => new Date(b.lastRead || 0).getTime() - new Date(a.lastRead || 0).getTime()
    );
}
