import PageViewer from "./PdfViewer"
import "./PdfReader.css"
import { ReaderProvider, useReader } from "./ReaderContext"
import ReaderMenu from "./ReaderMenu"

interface PdfReaderProps {
    file: string
}

function InnerReader() {
    const { nextPage, prevPage } = useReader();

    const handleNavigationClick = (e: React.MouseEvent) => {
        const { clientX } = e
        const { innerWidth } = window
        if (clientX > innerWidth / 2) {
            nextPage()
        } else {
            prevPage()
        }
    }

    return (
        <div className="reader" onClick={handleNavigationClick}>
            <ReaderMenu />
            <PageViewer />
        </div>
    )
}

export default function PdfReader({ file }: PdfReaderProps) {
    return (
        <ReaderProvider file={file}>
            <InnerReader />
        </ReaderProvider>
    )
}
