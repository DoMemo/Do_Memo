import { INDEXED_DB } from 'lib/enum/Indexed_DB';

export const initIndexedDB = async () => {
  return new Promise((resolve, reject) => {
    const dbRequest = indexedDB.open(INDEXED_DB.DB_TITLE, INDEXED_DB.VERSION);

    let db;

    dbRequest.onsuccess = (event) => {
      db = dbRequest.result;
      resolve(db);
    };

    dbRequest.onerror = (event) => {
      reject(event);
    };

    dbRequest.onupgradeneeded = (event) => {
      db = dbRequest.result;
      // oldVersion은 이전 버전의 DB 버전을 의미합니다. (1일 경우 0으로 시작)
      let oldVersion = event.oldVersion;

      if (oldVersion < 1) {
        db.createObjectStore(INDEXED_DB.TODO_LIST, { keyPath: 'id', autoIncrement: true });
        db.createObjectStore(INDEXED_DB.HISTORY_LIST, { keyPath: 'id', autoIncrement: true });
        db.createObjectStore(INDEXED_DB.CALENDAR_TODO, { keyPath: 'id', autoIncrement: true });
      }
    };
  });
};
