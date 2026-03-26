import { fakeBooks } from '../constants/fake_data';
import type { Book } from '../types/book';
import { api } from './api';

export async function getBooks(): Promise<Book[]> {

    if (import.meta.env.DEV) {
        console.log("Mock Mode: Loading fake book data");
        await new Promise(resolve => setTimeout(resolve, 500));
        return fakeBooks;
    }

    const response = await api.get('/books');

    if (!response.ok) {
        throw new Error('Failed to fetch books');
    }

    const data: Book[] = await response.json();

    return [...data].sort(
        (a, b) => new Date(b.lastPageRead || 0).getTime() - new Date(a.lastPageRead || 0).getTime()
    );
}

export async function getBookById(id: number): Promise<Book> {
    const response = await api.get(`/books/${id}`);

    if (!response.ok) {
        throw new Error(`Failed to fetch book with ID ${id}`);
    }

    const data: Book = await response.json();

    return data;
}

export async function getBookDownloadUrl(bookId: number): Promise<string> {

    if (import.meta.env.DEV) {
        const book = fakeBooks.find(b => b.id === bookId);
        return book?.bookReference || "";
    }

    const response = await api.get(`/books/${bookId}/download-url`);

    if (!response.ok) {
        throw new Error('Failed to fetch book download URL');
    }

    const data = await response.json();

    return data.url;
}
