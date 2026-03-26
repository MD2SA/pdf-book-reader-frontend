import { type Book } from '../types/book';

export const fakeBooks: Book[] = [
    {
        id: 1,
        title: "Introduction to HTTP/2",
        bookReference: "https://raw.githubusercontent.com/KAYOKG/BibliotecaDev/main/LivrosDev/A%20Startup%20Enxuta%20-%20Autor%20(Eric%20Ries).pdf",
        lastPageRead: 5,
        lastTimeRead: "2024-03-20T10:30:00",
        favorite: true
    },
    {
        id: 2,
        title: "Clean Code Concepts",
        bookReference: "https://raw.githubusercontent.com/KAYOKG/BibliotecaDev/main/LivrosDev/A%20Web%20Mobile%20-%20Programe%20para%20um%20Mundo%20de%20Muitos%20Dispositivos%20-%20Autor%20(Casa%20do%20C%C3%B3digo).pdf",
        lastPageRead: 42,
        lastTimeRead: "2024-03-19T18:15:00",
        favorite: false
    },
    {
        id: 3,
        title: "React Design Patterns",
        bookReference: "https://raw.githubusercontent.com/mozilla/pdf.js/master/web/compressed.tracemonkey-pldi-09.pdf",
        lastPageRead: 0,
        lastTimeRead: "2024-03-21T09:00:00",
        favorite: true
    },
    {
        id: 4,
        title: "Quarkus for Spring Developers",
        bookReference: "https://raw.githubusercontent.com/KAYOKG/BibliotecaDev/main/LivrosDev/A%20Startup%20Enxuta%20-%20Autor%20(Eric%20Ries).pdf",
        lastPageRead: 1,
        lastTimeRead: "2024-03-15T14:20:00",
        favorite: false
    }
];
