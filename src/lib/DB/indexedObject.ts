import { INDEXED_DB } from 'lib/enum/Indexed_DB';
import { initIndexedDB } from './indexedDB';

export const createObject = async (key: string) => {
  const db = (await initIndexedDB()) as IDBDatabase;
  const objectStore = db.transaction(key, 'readwrite').objectStore(key);
  return objectStore;
};

export const getObject = async (key: string) => {
  const db = (await initIndexedDB()) as IDBDatabase;
  const objectStore = db.transaction(key, 'readonly').objectStore(key);
  return objectStore;
};

export const deleteObject = async (key: string) => {
  const db = (await initIndexedDB()) as IDBDatabase;
  const objectStore = db.transaction(key, 'readwrite').objectStore(key);
  return objectStore;
};
