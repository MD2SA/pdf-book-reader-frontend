import { createContext, useState, useContext, useEffect } from 'react';
import type { ReaderContextType } from '../../types/book';
import useEpub from '../../hooks/useEpub';
import type { Rendition } from 'epubjs';

const ReaderContext = createContext<ReaderContextType | null>(null);

interface ReaderProviderProps {
    file: Blob;
    children: React.ReactNode;
}

export function ReaderProvider({ file, children }: ReaderProviderProps) {
    const { book, isLoading } = useEpub(file);
    const [rendition, setRendition] = useState<Rendition | null>(null);

    useEffect(() => {
        if (!book) return;
        
        // Generate locations in background for accurate "page" jumping
        // 600 chars per "page" is a standard EPUB estimate
        const generate = async () => {
            try {
                await book.locations.generate(600);
            } catch (err) {
                console.warn("Failed to generate locations:", err);
            }
        };
        generate();
    }, [book]);

    const nextPage = () => {
        rendition?.next();
    };

    const prevPage = () => {
        rendition?.prev();
    };

    const goToLocation = (location: string | number) => {
        if (!rendition || !book) return;
        
        const target = location.toString().trim();
        if (!target) return;
        const num = Number(target);

        // If it's a small number, prioritize jumping to that chapter (spine item)
        // This makes "Page 2" jump to the 2nd chapter start instead of a character offset
        // which helps when previous sections are very short.
        const spineLength = (book.spine as any).items?.length || (book.spine as any).spineItems?.length || 0;
        if (!isNaN(num) && num > 0 && num <= spineLength) {
            const item = book.spine.get(num - 1);
            if (item) {
                rendition.display(item.href);
                return;
            }
        }

        // Fallback for larger numbers: Use character-based locations if generated
        if (!isNaN(num) && book.locations && book.locations.length() > 0) {
            const cfi = book.locations.cfiFromLocation(num);
            if (cfi) {
                rendition.display(cfi);
                return;
            }
        }

        // Default to letting epubjs handle the string (could be CFI or href)
        rendition.display(target);
    };

    return (
        <ReaderContext.Provider value={{ book, rendition, setRendition, nextPage, prevPage, goToLocation, isLoading }}>
            {children}
        </ReaderContext.Provider>
    );
}

export function useReader() {
    const context = useContext(ReaderContext);
    if (!context) {
        throw new Error('useReader must be used within a ReaderProvider');
    }
    return context;
}
