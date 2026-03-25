import { useEffect, useState } from "react"
import type { Book } from "../types/Books";
import BookCard from "../components/BookCard";
import "./Home.css";
import { books as fakeBooks } from "../assets/test-data";

export default function Home() {
    const [books, setBooks] = useState<Book[]>(fakeBooks);

    useEffect(() => {
        fetch("http://localhost:8080/api/books")
            .then(res => res.json())
            .then(data => {
                const sorted = [...data].sort((a, b) =>
                    new Date(b.lastRead).getTime() - new Date(a.lastRead).getTime()
                );
                setBooks(sorted);
            })
            .catch(err => console.error("Failed to load books:", err));
    }, []);

    const featuredBook = books[0];
    const otherBooks = books.slice(1);

    return (
        <div className="container home-container fade-in">
            <header className="home-header">
                <h1 className="home-title">PDF Book Reader</h1>
                <p className="home-subtitle">Digital Library System</p>
            </header>

            <main>
                <section className="section-margin">
                    <div className="section-header">
                        <h2 className="section-label">Current Reading</h2>
                    </div>
                    {featuredBook ? (
                        <div className="card featured-card">
                            <BookCard book={featuredBook} isFeatured={true} />
                        </div>
                    ) : (
                        <div className="empty-state">
                            No active books in repository.
                        </div>
                    )}
                </section>

                <section>
                    <div className="section-header">
                        <h2 className="section-label">Library Index</h2>
                    </div>
                    <div className="books-grid">
                        {otherBooks.map(book => (
                            <div key={book.id} className="card grid-item">
                                <BookCard book={book} />
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    )
}
