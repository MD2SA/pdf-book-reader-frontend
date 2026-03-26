import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAuthForm } from '../../hooks/useAuthForm';
import styles from './Login.module.css';

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const { fields, setField, error, isSubmitting, handleSubmit } = useAuthForm({
        username: '',
        password: '',
    });

    const onSubmit = handleSubmit(async () => {
        await login({ username: fields.username, password: fields.password });
        navigate('/', { replace: true });
    });

    return (
        <div className={styles.authContainer}>
            <div className={styles.authCard}>
                <header>
                    <h1 className={styles.authTitle}>Welcome Back</h1>
                    <p className={styles.authSubtitle}>Continue your reading journey where you left off.</p>
                </header>

                {error && <div className={styles.errorMessage}>{error}</div>}

                <form className={styles.authForm} onSubmit={onSubmit}>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel} htmlFor="login-username">Username</label>
                        <input
                            id="login-username"
                            className={styles.formInput}
                            type="text"
                            placeholder="Enter your username"
                            value={fields.username}
                            onChange={(e) => setField('username', e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.formLabel} htmlFor="login-password">Password</label>
                        <input
                            id="login-password"
                            className={styles.formInput}
                            type="password"
                            placeholder="••••••••"
                            value={fields.password}
                            onChange={(e) => setField('password', e.target.value)}
                            required
                        />
                    </div>

                    <button
                        className={styles.authButton}
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Authenticating...' : 'Sign In'}
                    </button>
                </form>

                <div className={styles.authFooter}>
                    <span>Don't have an account?</span>{' '}
                    <Link to="/register" className={styles.authLink}>Create Account</Link>
                </div>
            </div>
        </div>
    );
};
