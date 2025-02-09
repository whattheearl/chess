import * as Lichess from "./svc/lichess";
import { cron } from "@elysiajs/cron";
import { Elysia } from "elysia";
import { env } from "bun";
import * as ChessRecordDb from "./db/chess-records";
import { type ChessRecordAdd } from "./db/chess-records";

const app = new Elysia()
    .use(
        cron({
            name: "Update ChessRecord",
            //pattern: "0 0 0 */1 * *",
            pattern: "0 */1 * * * *",
            async run() {
                const response = await Lichess.getLichessAcount();

                if (response.error) {
                    console.error("Unable to getLichessAcount", response.error);
                    return;
                }

                const account = response.data;
                const record: ChessRecordAdd = {
                    combined: account.count.all,
                    loss: account.count.loss,
                    playTime: account.playTime.total,
                    puzzleGames: account.perfs.puzzle.games,
                    puzzleRating: account.perfs.puzzle.rating,
                    rapidGames: account.perfs.rapid.games,
                    rapidRating: account.perfs.rapid.rating,
                    username: account.username,
                    win: account.count.win,
                };
                ChessRecordDb.addChessRecord(record);
            },
        }),
    )
    .get("/", async () => {
        return ChessRecordDb.getChessRecords();
    })
    .listen(env.PORT ?? 8080);

console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

export type App = typeof app;
