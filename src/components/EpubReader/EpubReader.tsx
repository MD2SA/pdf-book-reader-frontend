import { Loading } from '../Loading';
import { EpubViewer } from '../EpubViewer/EpubViewer';
import { useReader } from '../ReaderContext';
import { ReaderMenu } from '../ReaderMenu';
import styles from './EpubReader.module.css';

export function EpubReader({ title }: { title: string }) {
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
            <EpubViewer />
        </div>
    );
}
