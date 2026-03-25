import { useEffect, useState } from "react"
import type { Book } from "../types/Books";
import BookCard from "../components/BookCard";
import "./Home.css";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Home() {
    const [books, setBooks] = useState<Book[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { user, logout } = useAuth();

    useEffect(() => {
        api.get("/books")
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch books");
                return res.json();
            })
            .then(data => {
                const sorted = [...data].sort((a, b) =>
                    new Date(b.lastRead || 0).getTime() - new Date(a.lastRead || 0).getTime()
                );
                setBooks(sorted);
            })
            .catch(err => {
                console.error("Failed to load books:", err);
                setError("Unable to load your library. Please try again later.");
            });
    }, []);

    const featuredBook = books[0];
    const otherBooks = books.slice(1);

    return (
        <div className="container home-container fade-in">
            <header className="home-header">
                <div>
                    <h1 className="home-title">PDF Book Reader</h1>
                    <p className="home-subtitle">Digital Library System</p>
                </div>
                
                <div className="user-profile">
                    <div className="user-info">
                        <span className="user-name">{user?.username}</span>
                    </div>
                    <button className="logout-button" onClick={logout}>
                        Sign Out
                    </button>
                </div>
            </header>

            <main>
                {error && <div className="error-message">{error}</div>}
                
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
                            {error ? "Error loading repository." : "No active books in repository."}
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

