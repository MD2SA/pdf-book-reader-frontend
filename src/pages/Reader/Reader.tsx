import { useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useBookStorage } from "../../hooks/useBookStorage";
import { Loading } from "../../components/Loading";
import { ReaderProvider } from "../../components/ReaderContext";
import { PdfReader } from "../../components/PdfReader/PdfReader";
import type { Book } from "../../types/book";

export function Reader() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const bookId = Number(id);
    const bookMetadata: Book = location.state?.book;

    const { pdfData, isReady, isDownloading, download } = useBookStorage(bookId);

    useEffect(() => {
        if (!bookMetadata) {
            navigate("/", { replace: true });
        } else if (!isReady && !isDownloading) {
            download(bookMetadata.title);
        }
    }, [bookMetadata, isReady, isDownloading, navigate]);

    if (!bookMetadata || (!isReady && isDownloading)) {
        return <Loading message={bookMetadata ? `Preparing: ${bookMetadata.title}...` : "Redirecting..."} fullScreen />;
    }

    return (
        <ReaderProvider file={pdfData!}>
            <PdfReader title={bookMetadata.title} />
        </ReaderProvider>
    );
}
