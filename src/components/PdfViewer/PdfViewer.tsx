import { useEffect, useRef } from 'react';
import { useReader } from '../ReaderContext';
import styles from '../PdfReader/PdfReader.module.css';
import type { PDFPageProxy, RenderTask } from 'pdfjs-dist';

const pageCache = new Map<string, ImageBitmap>();

function cacheKey(docFingerprint: string, pageNum: number, scale: number) {
    return `${docFingerprint}:${pageNum}:${scale}`;
}

export function PdfViewer() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const renderTaskRef = useRef<RenderTask | null>(null);
    const offscreenRef = useRef<HTMLCanvasElement | null>(null);
    const { pdf, page: pageNum } = useReader();

    useEffect(() => {
        pageCache.clear();
    }, [pdf]);

    useEffect(() => {
        const renderPage = async () => {
            if (!pdf || !canvasRef.current || pageNum < 1 || pageNum > pdf.numPages)
                return;

            // Await the previous render's cancellation before touching the canvas
            if (renderTaskRef.current) {
                const prev = renderTaskRef.current
                renderTaskRef.current = null
                try {
                    prev.cancel()
                    await prev.promise
                } catch {
                    // RenderingCancelledException — expected
                }
            }

            const canvas = canvasRef.current;
            const dpr = window.devicePixelRatio || 1;
            const BASE_SCALE = 1.5;
            const scale = BASE_SCALE * dpr;

            const fingerprint = Array.isArray(pdf.fingerprints)
                ? pdf.fingerprints[0]
                : (pdf as any).fingerprint ?? 'unknown';

            const key = cacheKey(fingerprint, pageNum, scale);
            if (pageCache.has(key)) {
                const bitmap = pageCache.get(key)!;
                canvas.width = bitmap.width;
                canvas.height = bitmap.height;
                canvas.style.width = `${bitmap.width / dpr}px`;
                canvas.style.height = `${bitmap.height / dpr}px`;
                const context = canvas.getContext('2d')!;
                context.drawImage(bitmap, 0, 0);
                return;
            }

            try {

                if (renderTaskRef.current) {
                    renderTaskRef.current.cancel()
                    renderTaskRef.current = null
                }

                const page: PDFPageProxy = await pdf.getPage(pageNum)
                const viewport = page.getViewport({ scale })

                if (!offscreenRef.current) {
                    offscreenRef.current = document.createElement('canvas');
                }

                const offscreen = offscreenRef.current
                offscreen.width = viewport.width
                offscreen.height = viewport.height

                const offCtx = offscreen.getContext('2d', { willReadFrequently: false })!

                renderTaskRef.current = page.render({
                    canvas: offscreen,
                    canvasContext: offCtx,
                    viewport,
                })

                await renderTaskRef.current.promise
                renderTaskRef.current = null

                const bitmap = await createImageBitmap(offscreen)
                pageCache.set(key, bitmap)

                canvas.width = viewport.width
                canvas.height = viewport.height
                canvas.style.width = `${viewport.width / dpr}px`
                canvas.style.height = `${viewport.height / dpr}px`
                const ctx = canvas.getContext('2d')!
                ctx.drawImage(bitmap, 0, 0)

                page.cleanup()
            } catch (error: any) {
                if (error?.name === 'RenderingCancelledException') return
                console.error("Canvas render error:", error)
            }

        };

        renderPage();

        return () => {
            if (renderTaskRef.current) {
                renderTaskRef.current.cancel()
                renderTaskRef.current = null
            }
        }
    }, [pdf, pageNum]);

    return (
        <div className={styles.pageContainer}>
            <canvas ref={canvasRef} />
        </div>
    );
}
