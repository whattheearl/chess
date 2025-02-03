import * as Sqlite from "./_core";

export interface ChessRecordAdd {
    combined: number;
    loss: number;
    playTime: number;
    puzzleGames: number;
    puzzleRating: number;
    rapidGames: number;
    rapidRating: number;
    username: string;
    win: number;
}

export interface ChessRecord {
    combined: number;
    createdAt: string;
    id: number;
    loss: number;
    playTime: number;
    puzzleGames: number;
    puzzleRating: number;
    rapidGames: number;
    rapidRating: number;
    username: string;
    win: number;
}

export function createChessRecordTable() {
    const db = Sqlite.getDb();
    //db.run(`DROP TABLE IF EXISTS CHESS_RECORDS`);
    db.run(`CREATE TABLE IF NOT EXISTS CHESS_RECORDS(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        createdAt TEXT,
        rapidRating INTEGER,
        rapidGames INTEGER,
        puzzleRating INTEGER,
        puzzleGames INTEGER,
        playTime INTEGER,
        win INTEGER,
        loss INTEGER,
        combined INTEGER
    )`);
}
createChessRecordTable();

export function addChessRecord(record: ChessRecordAdd) {
    const date = new Date();
    const now = date.toISOString();
    const db = Sqlite.getDb();
    db.run(
        "INSERT INTO CHESS_RECORDS (username, createdAt, rapidRating, rapidGames, puzzleRating, puzzleGames, playTime, win, loss, combined) VALUES (?,?,?,?,?,?,?,?,?,?)",
        [
            record.username,
            now,
            record.rapidRating,
            record.rapidGames,
            record.puzzleRating,
            record.puzzleGames,
            record.playTime,
            record.win,
            record.loss,
            record.combined,
        ],
    );
}

export function getChessRecords(): [ChessRecord] {
    const db = Sqlite.getDb();
    const data = db.query("SELECT * FROM CHESS_RECORDS").all();
    if (!data) {
        return [] as any as [ChessRecord];
    }
    return data as [ChessRecord];
}
