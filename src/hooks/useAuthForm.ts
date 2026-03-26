import { useState } from 'react';

interface UseAuthFormResult<T extends Record<string, string>> {
    fields: T;
    setField: <K extends keyof T>(key: K, value: T[K]) => void;
    error: string | null;
    setError: (error: string | null) => void;
    isSubmitting: boolean;
    handleSubmit: (action: () => Promise<void>) => (e: React.FormEvent) => void;
}

export function useAuthForm<T extends Record<string, string>>(
    initialFields: T
): UseAuthFormResult<T> {
    const [fields, setFields] = useState<T>(initialFields);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const setField = <K extends keyof T>(key: K, value: T[K]) => {
        setFields((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = (action: () => Promise<void>) => async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            await action();
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'An unexpected error occurred.';
            setError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return { fields, setField, error, setError, isSubmitting, handleSubmit };
}
