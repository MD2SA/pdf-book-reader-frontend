import { createContext, useState, useContext } from 'react';
import type { ReaderContextType } from '../../types/book';
import useEpub from '../../hooks/useEpub';
import type { Rendition } from 'epubjs';

const ReaderContext = createContext<ReaderContextType | null>(null);

interface ReaderProviderProps {
    file: Uint8Array;
    children: React.ReactNode;
}

export function ReaderProvider({ file, children }: ReaderProviderProps) {
    const { book, isLoading } = useEpub(file);
    const [rendition, setRendition] = useState<Rendition | null>(null);

    const nextPage = () => {
        rendition?.next();
    };

    const prevPage = () => {
        rendition?.prev();
    };

    return (
        <ReaderContext.Provider value={{ book, rendition, setRendition, nextPage, prevPage, isLoading }}>
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
