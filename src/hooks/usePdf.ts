import { useEffect, useState } from "react"
import * as pdfjsLib from "pdfjs-dist"
import type { PDFDocumentProxy } from "pdfjs-dist"
import worker from "pdfjs-dist/build/pdf.worker?url"

pdfjsLib.GlobalWorkerOptions.workerSrc = worker

interface UsePdfResult {
    pdf: PDFDocumentProxy | null;
    numPages: number;
    isLoading: boolean;
}

export default function usePdf(data: Uint8Array | null): UsePdfResult {
    const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null)
    const [numPages, setNumPages] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!data || data.length === 0) return;

        const loadPdf = async () => {
            setIsLoading(true);
            try {
                const loadingTask = pdfjsLib.getDocument({
                    data: data.slice(0)
                });

                const pdfDoc = await loadingTask.promise
                setPdf(pdfDoc)
                setNumPages(pdfDoc.numPages)
            } catch (error: any) {
                if (error?.name === 'RenderingCancelledException') return;
                console.error("Render error:", error);
                setPdf(null)
                setNumPages(0)
            } finally {
                setIsLoading(false);
            }
        }

        loadPdf()
    }, [data])

    return { pdf, numPages, isLoading }
}
