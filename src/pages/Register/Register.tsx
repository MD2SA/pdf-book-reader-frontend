import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from '../Login/Login.module.css';

export function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            await register({ username, email, password });
            navigate('/', { replace: true });
        } catch (err: any) {
            setError(err.message || 'Registration failed. Try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.authContainer}>
            <div className={styles.authCard}>
                <header>
                    <h1 className={styles.authTitle}>Get Started</h1>
                    <p className={styles.authSubtitle}>Create your personal library of PDF books.</p>
                </header>

                {error && <div className={styles.errorMessage}>{error}</div>}

                <form className={styles.authForm} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label className={styles.formLabel} htmlFor="username">Username</label>
                        <input
                            id="username"
                            className={styles.formInput}
                            type="text"
                            placeholder="Pick a unique username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.formLabel} htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            className={styles.formInput}
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.formLabel} htmlFor="password">Password</label>
                        <input
                            id="password"
                            className={styles.formInput}
                            type="password"
                            placeholder="Choose a strong password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        className={styles.authButton}
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Creating Account...' : 'Sign Up'}
                    </button>
                </form>

                <div className={styles.authFooter}>
                    <span>Already have an account?</span>
                    <Link to="/login" className={styles.authLink}>Sign In</Link>
                </div>
            </div>
        </div>
    );
};
