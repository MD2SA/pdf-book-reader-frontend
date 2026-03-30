import { useEffect, useState } from "react";
import ePub, { Book as EpubBook } from "epubjs";

interface UseEpubResult {
    book: EpubBook | null;
    isLoading: boolean;
}

export default function useEpub(data: Uint8Array | null): UseEpubResult {
    const [book, setBook] = useState<EpubBook | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!data || data.length === 0) return;

        let cancelled = false;
        const buffer: ArrayBuffer = data.slice().buffer;

        const loadEpub = async () => {
            setIsLoading(true);
            try {
                const newBook = ePub(buffer);

                await newBook.ready;

                if (cancelled) {
                    newBook.destroy();
                    return;
                }

                setBook(prev => {
                    prev?.destroy();
                    return newBook;
                });
            } catch (error) {
                if (cancelled) return;
                console.error("Error loading EPUB:", error);
                setBook(null);
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        };

        loadEpub();

        return () => {
            cancelled = true;
        };
    }, [data]);

    useEffect(() => {
        return () => {
            book?.destroy();
        };
    }, [book]);

    return { book, isLoading };
}
