import { useEffect, useRef } from 'react';
import { useReader } from '../ReaderContext';
import styles from '../PdfReader/PdfReader.module.css';
import type { RenderTask } from 'pdfjs-dist';

export function PdfViewer() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const renderTaskRef = useRef<RenderTask | null>(null);
    const { pdf, page: pageNum } = useReader();

    useEffect(() => {
        const renderPage = async () => {
            if (!pdf || !canvasRef.current || pageNum < 1 || pageNum > pdf.numPages)
                return;

            try {

                if (renderTaskRef.current) {
                    renderTaskRef.current.cancel();
                }

                const page = await pdf.getPage(pageNum);
                const viewport = page.getViewport({ scale: 1.5 });
                const canvas = canvasRef.current;
                const context = canvas.getContext('2d');

                if (!context) return;

                canvas.height = viewport.height;
                canvas.width = viewport.width;

                renderTaskRef.current = page.render({
                    canvas,
                    canvasContext: context,
                    viewport,
                });

                await renderTaskRef.current.promise;

                renderTaskRef.current = null;

            } catch (error: any) {
                if (error?.name === 'RenderingCancelledException') return;
                console.error("Canvas render error:", error);
            }
        };

        renderPage();

        return () => {
            if (renderTaskRef.current) renderTaskRef.current.cancel();
        }
    }, [pdf, pageNum]);

    return (
        <div className={styles.pageContainer}>
            <canvas ref={canvasRef} />
        </div>
    );
}
