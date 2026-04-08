import styles from './Loading.module.css';

interface LoadingProps {
    message?: string;
    fullScreen?: boolean;
}

export function Loading({ message = "Loading...", fullScreen = false }: LoadingProps) {
    const containerClass = fullScreen ? styles.fullScreen : styles.container;

    return (
        <div className={containerClass}>
            <div className={styles.spinnerWrapper}>
                <div className={styles.spinner}></div>
                <div className={styles.spinnerInner}></div>
            </div>
            {message && <p className={styles.text}>{message}</p>}
        </div>
    );
}
