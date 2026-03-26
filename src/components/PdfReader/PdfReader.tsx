import { Loading } from '../Loading';
import { PdfViewer } from '../PdfViewer';
import { useReader } from '../ReaderContext';
import { ReaderMenu } from '../ReaderMenu';
import styles from './PdfReader.module.css';

export default function PdfReader({ title }: { title: string }) {
    const { nextPage, prevPage, isLoading } = useReader();

    if (isLoading) {
        return <Loading message={`Opening ${title}...`} />;
    }

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
