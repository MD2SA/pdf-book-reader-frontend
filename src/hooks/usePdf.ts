import { useEffect, useState } from "react"
import * as pdfjsLib from "pdfjs-dist"
import type { PDFDocumentProxy } from "pdfjs-dist"
import worker from "pdfjs-dist/build/pdf.worker?url"

pdfjsLib.GlobalWorkerOptions.workerSrc = worker

interface UsePdfResult {
    pdf: import("pdfjs-dist").PDFDocumentProxy | null
    numPages: number
}

export default function usePdf(url: string): UsePdfResult {
    const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null)
    const [numPages, setNumPages] = useState<number>(0)

    useEffect(() => {
        if (!url) return;

        const loadPdf = async () => {
            try {
                const loadingTask = pdfjsLib.getDocument(url)
                const pdfDoc = await loadingTask.promise

                setPdf(pdfDoc)
                setNumPages(pdfDoc.numPages)
            } catch (error) {
                console.error("Error loading PDF:", error)
                setPdf(null)
                setNumPages(0)
            }
        }

        loadPdf()
    }, [url])

    return { pdf, numPages }
}
