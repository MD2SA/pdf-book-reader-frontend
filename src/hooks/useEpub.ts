import { useEffect, useState } from "react";
import ePub, { Book as EpubBook } from "epubjs";

interface UseEpubResult {
    book: EpubBook | null;
    isLoading: boolean;
}

export default function useEpub(data: Blob | null): UseEpubResult {
    const [book, setBook] = useState<EpubBook | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!data) {
            setBook(null);
            return;
        }

        let cancelled = false;

        const loadEpub = async () => {
            setIsLoading(true);
            try {
                const buffer = await data.arrayBuffer();
                if (cancelled) return;

                const internalBook = ePub(buffer);
                await internalBook.ready;

                if (cancelled) {
                    internalBook.destroy();
                    return;
                }

                setBook(internalBook);
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
            if (book) {
                console.log("Destroying book instance");
                book.destroy();
            }
        };
    }, [book]);

    return { book, isLoading };
}
