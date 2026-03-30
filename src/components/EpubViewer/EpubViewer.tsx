import { useEffect, useRef } from 'react';
import { useReader } from '../ReaderContext';
import styles from './EpubViewer.module.css';

export function EpubViewer() {
    const viewerRef = useRef<HTMLDivElement | null>(null);
    const { book, setRendition } = useReader();

    useEffect(() => {
        if (!book || !viewerRef.current) return;

        let active = true;
        console.log("Rendering book to container");
        
        const rendition = book.renderTo(viewerRef.current, {
            width: "100%",
            height: "100%",
            flow: "paginated",
            manager: "default",
            allowScriptedContent: true,
        });

        const displayRendition = async () => {
            try {
                await rendition.display();
                if (active) {
                    setRendition(rendition);
                }
            } catch (err) {
                console.error("Error displaying rendition:", err);
            }
        };

        displayRendition();

        return () => {
            active = false;
            console.log("Destroying rendition");
            try {
                rendition.destroy();
            } catch (err) {
                console.debug("Ignored error during rendition destruction:", err);
            }
            setRendition(null);
        };
    }, [book, setRendition]);

    return (
        <div className={styles.viewerContainer}>
            <div ref={viewerRef} className={styles.epubViewer} />
        </div>
    );
}
