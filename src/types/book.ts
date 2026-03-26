import type { PDFDocumentProxy } from "pdfjs-dist";

export interface ReaderContextType {
    pdf: PDFDocumentProxy | null;
    numPages: number;
    page: number;
    setPage: (page: number) => void;
    nextPage: () => void;
    prevPage: () => void;
    isLoading: boolean;
}

export interface Book {
    id: number;
    title: string;
    bookReference: string;
    lastPageRead: number;
    lastTimeRead: string;
    favorite: boolean;
}
