import type { Book as EpubBook, Rendition } from "epubjs";

export interface ReaderContextType {
    book: EpubBook | null;
    rendition: Rendition | null;
    setRendition: (rendition: Rendition | null) => void;
    nextPage: () => void;
    prevPage: () => void;
    goToLocation: (location: string | number) => void;
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
