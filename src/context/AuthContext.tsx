import React, { createContext, useContext, useState, useEffect } from 'react';
import type { AuthUser, AuthContextType, LoginRequest, RegisterRequest } from '../types/auth';
import { loginUser, registerUser } from '../services/authService';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser && token) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, [token]);

    const persistSession = (authToken: string, authUser: AuthUser) => {
        setToken(authToken);
        setUser(authUser);
        localStorage.setItem('token', authToken);
        localStorage.setItem('user', JSON.stringify(authUser));
    };

    const login = async (credentials: LoginRequest) => {
        const data = await loginUser(credentials);
        persistSession(data.token, { username: data.username, email: data.email });
    };

    const register = async (credentials: RegisterRequest) => {
        const data = await registerUser(credentials);
        persistSession(data.token, { username: data.username, email: data.email });
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};