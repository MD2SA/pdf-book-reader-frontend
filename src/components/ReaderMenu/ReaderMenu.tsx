import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReader } from '../ReaderContext';
import styles from './ReaderMenu.module.css';

export function ReaderMenu() {
    const navigate = useNavigate();
    const { nextPage, prevPage } = useReader();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    const containerClass = isOpen
        ? `${styles.menuContainer} ${styles.isOpen}`
        : styles.menuContainer;

    return (
        <div className={containerClass} onClick={(e) => e.stopPropagation()}>
            <div className={styles.controlsWrapper}>
                <div className={styles.controls}>
                    <button className={styles.readerBtn} onClick={() => navigate('/')}>Library</button>
                    <div className={styles.controlDivider} />
                    <button className={styles.readerBtn} onClick={prevPage}>Prev</button>
                    <button className={styles.readerBtn} onClick={nextPage}>Next</button>
                </div>
            </div>

            <button className={styles.menuToggleBtn} onClick={toggleMenu}>
                {isOpen ? 'CLOSE MENU' : 'READER MENU'}
            </button>
        </div>
    );
}
