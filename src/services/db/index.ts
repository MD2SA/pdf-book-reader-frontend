import Dexie, { type Table } from 'dexie';
import { type CachedPDF } from '../../types/database';

const db = new Dexie('LibraryDB') as Dexie & {
    pdfs: Table<
        CachedPDF,
        number
    >
}

db.version(1).stores({
    pdfs: 'id, title, blob, cachedAt'
});


export { db };
