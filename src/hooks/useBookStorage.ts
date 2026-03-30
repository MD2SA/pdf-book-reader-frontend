import { useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../services/db';
import { getBookDownloadUrl } from '../services/bookService';

export const useBookStorage = (bookId: number) => {
    const [isDownloading, setIsDownloading] = useState(false);

    const cachedBook = useLiveQuery(() => db.books.get(bookId), [bookId]);

    const download = async (title: string) => {
        if (isDownloading || cachedBook) return;
        setIsDownloading(true);
        try {
            const signedUrl = await getBookDownloadUrl(bookId);
            const response = await fetch(signedUrl);
            const blob = await response.blob();
            await db.books.put({ id: bookId, title, blob, cachedAt: Date.now() });
        } catch (error) {
            console.error("Error downloading EPUB:", error);
        } finally {
            setIsDownloading(false);
        }
    };

    const saveBook = async (id: number, title: string, blob: Blob) => {
        await db.books.put({ id, title, blob, cachedAt: Date.now() });
    };

    return {
        bookData: cachedBook?.blob || null,
        isReady: !!cachedBook?.blob,
        isDownloading,
        download,
        saveBook
    };
};
