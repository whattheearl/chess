import { Database } from "bun:sqlite";

export function getDb() {
    const DATABASE_PATH = "./data/db.sqlite";
    return new Database(DATABASE_PATH);
}
