import type { AuthResponse, LoginRequest, RegisterRequest } from '../types/auth';
import { api } from './api';

export async function loginUser(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await api.post('/auth/login', credentials);

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Login failed');
    }

    return response.json();
}

export async function registerUser(credentials: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post('/auth/register', credentials);

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Registration failed');
    }

    return response.json();
}
