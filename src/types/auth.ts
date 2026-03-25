export interface AuthUser {
    username: string;
    email: string;
}

export interface AuthResponse {
    token: string;
    username: string;
    email: string;
}

export interface AuthContextType {
    user: AuthUser | null;
    token: string | null;
    loading: boolean;
    login: (credentials: LoginRequest) => Promise<void>;
    register: (credentials: RegisterRequest) => Promise<void>;
    logout: () => void;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

