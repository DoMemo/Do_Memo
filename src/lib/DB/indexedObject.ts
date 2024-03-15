import { INDEXED_DB } from "lib/enum/Indexed_DB";
import { initIndexedDB } from "./indexedDB";

export const createObject = async () => {
  const db = await initIndexedDB() as IDBDatabase;
  const objectStore = db.transaction(INDEXED_DB.TODO_LIST, 'readwrite').objectStore(INDEXED_DB.TODO_LIST);
  return objectStore;
}

export const getObject = async () => {
  const db = await initIndexedDB() as IDBDatabase;
  const objectStore = db.transaction(INDEXED_DB.TODO_LIST, 'readonly').objectStore(INDEXED_DB.TODO_LIST);
  return objectStore;
}

export const deleteObject = async () => {
  const db = await initIndexedDB() as IDBDatabase;
  const objectStore = db.transaction(INDEXED_DB.TODO_LIST, 'readwrite').objectStore(INDEXED_DB.TODO_LIST);
  return objectStore;
}
