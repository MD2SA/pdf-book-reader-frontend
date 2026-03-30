export interface CachedBook {
    id: number;
    title: string;
    blob: Blob;
    cachedAt: number;
}
