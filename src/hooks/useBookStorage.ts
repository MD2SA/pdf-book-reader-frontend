import { useEffect, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../services/db';
import { getBookDownloadUrl } from '../services/bookService';

export const useBookStorage = (bookId: number) => {
    const [isDownloading, setIsDownloading] = useState(false);
    const [pdfData, setPdfData] = useState<Uint8Array | null>(null);

    const cachedBook = useLiveQuery(() => db.pdfs.get(bookId), [bookId]);

    useEffect(() => {
        if (cachedBook?.blob) {
            cachedBook.blob.arrayBuffer().then(buffer => {
                setPdfData(new Uint8Array(buffer));
            }).catch(error => {
                console.error("Error converting blob to array buffer:", error);
                setPdfData(null);
            });
        } else {
            setPdfData(null);
        }
    }, [cachedBook?.blob]);

    const download = async (title: string) => {
        if (isDownloading || cachedBook) return;
        setIsDownloading(true);
        try {
            const signedUrl = await getBookDownloadUrl(bookId);
            const response = await fetch(signedUrl);
            const blob = await response.blob();
            await db.pdfs.put({ id: bookId, title, blob, cachedAt: Date.now() });
        } catch (error) {
            console.error("Error downloading PDF:", error);
        } finally {
            setIsDownloading(false);
        }
    };

    return {
        pdfData,
        isReady: !!pdfData,
        isDownloading,
        download
    };
};
