import { useState, useRef } from 'react';
import { uploadBook } from '../../services/bookService';
import { db } from '../../services/db';
import styles from './SubmitBook.module.css';

interface SubmitBookProps {
    onUploadSuccess: () => void;
}

export function SubmitBook({ onUploadSuccess }: SubmitBookProps) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsProcessing(true);
        setStatusMessage('Processing...');
        try {
            // Check if conversion is needed
            if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
                setStatusMessage('Converting PDF to EPUB...');
                // SIMULATED CONVERSION STEP
                // Real implementation would either use a library or send to a backend converter.
                await new Promise(resolve => setTimeout(resolve, 2000));
            }

            setStatusMessage('Uploading to Backend...');
            const uploadedBook = await uploadBook(file);

            setStatusMessage('Syncing Local Storage...');
            // Save the file as a blob to the local IndexedDB
            await db.books.put({
                id: uploadedBook.id,
                title: uploadedBook.title,
                blob: file, // Store the original file as blob
                cachedAt: Date.now()
            });

            setStatusMessage('Book Successfully Added!');
            onUploadSuccess();
            if (fileInputRef.current) fileInputRef.current.value = '';
        } catch (error) {
            console.error("Upload error:", error);
            setStatusMessage('Failed to upload. Please try again.');
        } finally {
            setTimeout(() => {
                setIsProcessing(false);
                setStatusMessage('');
            }, 3000);
        }
    };

    return (
        <>
            <div className={styles.submitContainer}>
                <input
                    type="file"
                    accept=".epub,.pdf"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className={styles.fileInput}
                    id="book-upload-input"
                    disabled={isProcessing}
                />
                <label htmlFor="book-upload-input" className={styles.uploadBtn}>
                    <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="3" 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        style={{ marginRight: '10px' }}
                    >
                        <line x1="12" y1="5" x2="12" y2="19"></line>
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    Import Book
                </label>
            </div>

            {isProcessing && (
                <div className={styles.statusOverlay}>
                    <div className={styles.spinner}></div>
                    <span className={styles.statusText}>{statusMessage}</span>
                </div>
            )}
        </>
    );
}


