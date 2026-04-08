import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useReader } from '../ReaderContext';
import styles from './ReaderMenu.module.css';

export function ReaderMenu() {
    const navigate = useNavigate();
    const { nextPage, prevPage, goToLocation } = useReader();
    const [isOpen, setIsOpen] = useState(false);
    const [jumpPage, setJumpPage] = useState('');

    const toggleMenu = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    const handleJumpPage = (e: React.FormEvent) => {
        e.preventDefault();
        if (jumpPage) {
            goToLocation(jumpPage);
            setJumpPage('');
        }
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
                    <div className={styles.controlDivider} />
                    <form onSubmit={handleJumpPage} className={styles.pageJump}>
                        <span>PAGE</span>
                        <div className={styles.inputWrapper}>
                            <input
                                type="text"
                                placeholder="..."
                                value={jumpPage}
                                onChange={(e) => setJumpPage(e.target.value)}
                            />
                            {jumpPage && <button type="submit" className={styles.jumpBtn}>GO</button>}
                            <button type="submit" style={{ display: 'none' }} aria-hidden="true" />
                        </div>
                    </form>
                </div>
            </div>

            <button className={`${styles.menuToggleBtn} ${isOpen ? styles.active : ''}`} onClick={toggleMenu}>
                <span className={styles.btnIcon}>
                    {isOpen ? '↓' : '↑'}
                </span>
                {!isOpen && <span className={styles.btnText}>MENU</span>}
            </button>
        </div>
    );
}
