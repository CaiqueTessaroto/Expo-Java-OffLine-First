import * as SQLite from 'expo-sqlite';

export type Pessoa = {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  sincronizado: number;
};

let dbPromise: Promise<SQLite.SQLiteDatabase> | null = null;

export function getDatabase() {
  if (!dbPromise) {
    dbPromise = SQLite.openDatabaseAsync('offline-first.db');
  }

  return dbPromise;
}

export async function initDatabase() {
  const db = await getDatabase();

  await db.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS pessoas (
      id TEXT PRIMARY KEY NOT NULL,
      nome TEXT NOT NULL,
      email TEXT,
      telefone TEXT,
      sincronizado INTEGER NOT NULL DEFAULT 0
    );
  `);
}

export async function inserirPessoa(
  id: string,
  nome: string,
  email: string,
  telefone: string
) {
  const db = await getDatabase();

  await db.runAsync(
    `INSERT INTO pessoas
      (id, nome, email, telefone, sincronizado)
     VALUES (?, ?, ?, ?, 0)`,
    id,
    nome,
    email,
    telefone
  );
}
