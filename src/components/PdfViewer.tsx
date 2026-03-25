import { useEffect, useRef } from "react"
import { useReader } from "./ReaderContext"

export default function PageViewer() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const { pdf, page: pageNum } = useReader()

    useEffect(() => {
        const renderPage = async () => {
            if (!pdf || !canvasRef.current) return

            const page = await pdf.getPage(pageNum)

            const viewport = page.getViewport({ scale: 1.5 })

            const canvas = canvasRef.current
            const context = canvas.getContext("2d")

            if (!context) return

            canvas.height = viewport.height
            canvas.width = viewport.width

            await page.render({
                canvas,
                canvasContext: context,
                viewport
            }).promise
        }

        renderPage()
    }, [pdf, pageNum])

    return (
        <div className="page-container">
            <canvas ref={canvasRef} />
        </div>
    )
}
