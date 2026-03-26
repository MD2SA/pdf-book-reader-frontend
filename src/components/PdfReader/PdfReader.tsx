import { PdfViewer } from '../PdfViewer';
import { ReaderProvider, useReader } from '../ReaderContext';
import { ReaderMenu } from '../ReaderMenu';
import styles from './PdfReader.module.css';

interface PdfReaderProps {
    file: string;
}

function InnerReader() {
    const { nextPage, prevPage } = useReader();

    const handleNavigationClick = (e: React.MouseEvent) => {
        const { clientX } = e;
        const { innerWidth } = window;
        if (clientX > innerWidth / 2) {
            nextPage();
        } else {
            prevPage();
        }
    };

    return (
        <div className={styles.reader} onClick={handleNavigationClick}>
            <ReaderMenu />
            <PdfViewer />
        </div>
    );
}

export function PdfReader({ file }: PdfReaderProps) {
    return (
        <ReaderProvider file={file}>
            <InnerReader />
        </ReaderProvider>
    );
}
