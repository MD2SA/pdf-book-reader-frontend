import { BrowserRouter as Router, Routes, Route, useParams, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import { PdfReader } from './components/PdfReader';
import { books } from './assets/test-data';
import Login from './pages/Login';
import { Register } from './pages/Register';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

export default function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* Protected Routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/reader/:id" element={<ReaderWrapper />} />
                    </Route>

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

function ReaderWrapper() {
    const { id } = useParams();
    const book = books.find((b) => b.id === Number(id)) || books[0];

    return <PdfReader file={book.uri} />;
}

