import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import Home from './pages/Home';
import PdfReader from './components/PdfReader';
import { books } from './assets/test-data';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/reader/:id" element={<ReaderWrapper />} />
            </Routes>
        </Router>
    );
}

function ReaderWrapper() {
    const { id } = useParams();
    const book = books.find((b) => b.id === Number(id)) || books[0];
    console.log(book)

    return <PdfReader file={book.uri} />;
}
