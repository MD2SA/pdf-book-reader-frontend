import React from 'react';
import './BookCard.css';
import type { Book } from '../types/Books';
import { useNavigate } from 'react-router-dom';

interface BookCardProps {
  book: Book;
  isFeatured?: boolean;
}

const BookCard: React.FC<BookCardProps> = ({ book, isFeatured = false }) => {
  const navigate = useNavigate();

  return (
    <div className={`book-card ${isFeatured ? 'featured' : ''}`}>
      <div className="book-cover-container">
        <div className="book-cover-placeholder">
           <span>{book.title.charAt(0)}</span>
        </div>
      </div>
      <div className="book-info">
        <h3 className="book-title" title={book.title}>{book.title}</h3>
        <div className="book-meta-group">
          <p className="book-meta">Read: {new Date(book.lastRead).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</p>
          <p className="book-meta">Page {book.lastPage}</p>
        </div>
        <button className="btn-primary continue-btn" onClick={() => navigate(`/reader/${book.id}`)}>
          {isFeatured ? 'Continue Reading' : 'Continue'}
        </button>
      </div>
    </div>
  );
};

export default BookCard;
