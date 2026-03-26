import type { PDFDocumentProxy } from "pdfjs-dist";

export interface ReaderContextType {
    pdf: PDFDocumentProxy | null;
    numPages: number;
    page: number;
    setPage: (page: number) => void;
    nextPage: () => void;
    prevPage: () => void;
}

export interface Book {
    id: number;
    title: string;
    uri: string;
    lastRead: string;
    lastPage: number;
}
