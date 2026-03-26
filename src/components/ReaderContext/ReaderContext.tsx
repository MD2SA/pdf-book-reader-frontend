import { createContext, useState, useContext } from 'react';
import type { ReaderContextType } from '../../types/book';
import usePdf from '../../hooks/usePdf';

const ReaderContext = createContext<ReaderContextType | null>(null);

interface ReaderProviderProps {
    file: Uint8Array;
    children: React.ReactNode;
}

export function ReaderProvider({ file, children }: ReaderProviderProps) {
    const { pdf, numPages, isLoading } = usePdf(file);
    const [page, setPage] = useState<number>(1);

    const nextPage = () => {
        setPage((p) => Math.min(p + 1, numPages));
    };

    const prevPage = () => {
        setPage((p) => Math.max(p - 1, 1));
    };

    return (
        <ReaderContext.Provider value={{ pdf, numPages, page, setPage, nextPage, prevPage, isLoading }}>
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
