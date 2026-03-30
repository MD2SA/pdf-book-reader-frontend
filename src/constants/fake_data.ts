import { type Book } from '../types/book';

export const fakeBooks: Book[] = [
    {
        id: 1,
        title: "Introduction to HTTP/2",
        bookReference: "https://raw.githubusercontent.com/gmoral/Books/master/Clean%20Code%20Collection%20-%20Robert%20C.%20Martin.epub",
        lastPageRead: 5,
        lastTimeRead: "2024-03-20T10:30:00",
        favorite: true
    },
    {
        id: 2,
        title: "Clean Code Concepts",
        bookReference: "https://raw.githubusercontent.com/gmoral/Books/master/Clean%20Code%20Collection%20-%20Robert%20C.%20Martin.epub",
        lastPageRead: 42,
        lastTimeRead: "2024-03-19T18:15:00",
        favorite: false
    },
    {
        id: 3,
        title: "React Design Patterns",
        bookReference: "https://raw.githubusercontent.com/gmoral/Books/master/Clean%20Code%20Collection%20-%20Robert%20C.%20Martin.epub",
        lastPageRead: 0,
        lastTimeRead: "2024-03-21T09:00:00",
        favorite: true
    },
    {
        id: 4,
        title: "Quarkus for Spring Developers",
        bookReference: "https://raw.githubusercontent.com/gmoral/Books/master/Clean%20Code%20Collection%20-%20Robert%20C.%20Martin.epub",
        lastPageRead: 1,
        lastTimeRead: "2024-03-15T14:20:00",
        favorite: false
    }
];
