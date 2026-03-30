import Dexie, { type Table } from 'dexie';
import { type CachedBook } from '../../types/database';

const db = new Dexie('LibraryDB') as Dexie & {
    books: Table<
        CachedBook,
        number
    >
}

db.version(1).stores({
    books: 'id, title, blob, cachedAt'
});


export { db };
