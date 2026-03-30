import { useEffect, useRef } from 'react';
import { useReader } from '../ReaderContext';
import styles from './EpubViewer.module.css';

export function EpubViewer() {
    const viewerRef = useRef<HTMLDivElement | null>(null);
    const { book, setRendition } = useReader();

    useEffect(() => {
        if (!book || !viewerRef.current) return;

        console.log("Rendering book to container");
        const rendition = book.renderTo(viewerRef.current, {
            width: "100%",
            height: "100%",
            flow: "paginated",
            manager: "default",
            allowScriptedContent: true,
        });

        rendition.display();
        setRendition(rendition);

        return () => {
            console.log("Destroying rendition");
            rendition.destroy();
            setRendition(null);
        };
    }, [book, setRendition]);

    return (
        <div className={styles.viewerContainer}>
            <div ref={viewerRef} className={styles.epubViewer} />
        </div>
    );
}
