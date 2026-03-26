export interface CachedPDF {
    id: number;
    title: string;
    blob: Blob;
    cachedAt: number;
}
