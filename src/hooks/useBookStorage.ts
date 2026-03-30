import { useEffect, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../services/db';
import { getBookDownloadUrl } from '../services/bookService';

export const useBookStorage = (bookId: number) => {
    const [isDownloading, setIsDownloading] = useState(false);
    const [bookData, setBookData] = useState<Uint8Array | null>(null);

    const cachedBook = useLiveQuery(() => db.books.get(bookId), [bookId]);

    useEffect(() => {
        if (cachedBook?.blob) {
            cachedBook.blob.arrayBuffer().then(buffer => {
                setBookData(new Uint8Array(buffer));
            }).catch(error => {
                console.error("Error converting blob to array buffer:", error);
                setBookData(null);
            });
        } else {
            setBookData(null);
        }
    }, [cachedBook?.blob]);

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

    return {
        bookData,
        isReady: !!bookData,
        isDownloading,
        download
    };
};
