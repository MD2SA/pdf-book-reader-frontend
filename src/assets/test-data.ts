import type { Book } from "../types/Books";

export const books: Book[] = [
    {
        id: 1,
        title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
        uri: '/pdfs/clean-code.pdf',
        lastRead: '2024-06-01',
        lastPage: 150,
    },
    {
        id: 2,
        title: 'The Pragmatic Programmer: Your Journey to Mastery',
        uri: '/pdfs/the-pragmatic-programmer.pdf',
        lastRead: '2024-05-20',
        lastPage: 200,
    },
    {
        id: 3,
        title: 'Design Patterns: Elements of Reusable Object-Oriented Software',
        uri: '/pdfs/design-patterns.pdf',
        lastRead: '2024-05-15',
        lastPage: 300,
    },
    {
        id: 4,
        title: 'Clean Architecture: A Craftsman’s Guide to Software Structure and Design',
        uri: '/pdfs/clean-architecture.pdf',
        lastRead: '2024-05-10',
        lastPage: 250,
    },
];
