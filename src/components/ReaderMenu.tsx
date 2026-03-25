import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useReader } from "./ReaderContext";

export default function ReaderMenu() {
    const navigate = useNavigate();
    const { page, setPage, nextPage, prevPage, numPages } = useReader();
    const [isOpen, setIsOpen] = useState(false);

    const handlePageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseInt(e.target.value)
        if (!isNaN(val)) {
            setPage(Math.max(1, Math.min(val, numPages)))
        }
    }

    const toggleMenu = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    }

    return (
        <div className={`reader-menu-container ${isOpen ? 'is-open' : ''}`} onClick={(e) => e.stopPropagation()}>
            <div className="controls-wrapper">
                <div className="controls">
                    <button className="reader-btn" onClick={() => navigate('/')}>Library</button>
                    <div className="control-divider" />

                    <button className="reader-btn" onClick={prevPage}>Prev</button>
                    <div className="page-jump">
                        <input
                            type="number"
                            value={page}
                            onChange={handlePageChange}
                            min={1}
                            max={numPages}
                        />
                        <span>/ {numPages || "?"}</span>
                    </div>
                    <button className="reader-btn" onClick={nextPage}>Next</button>
                </div>
            </div>

            <button className="menu-toggle-btn" onClick={toggleMenu}>
                {isOpen ? 'CLOSE MENU' : 'READER MENU'}
            </button>
        </div>
    );
}
