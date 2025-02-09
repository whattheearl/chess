export interface LichessAccount {
    id: string;
    username: string;
    perfs: {
        rapid: { games: number; rating: number; rd: number; prog: number };
        puzzle: { games: number; rating: number; rd: number; prog: number };
    };
    createdAt: number;
    seenAt: number;
    playTime: { total: number; tv: number };
    url: string;
    count: {
        all: number;
        loss: number;
        win: number;
    };
}

export interface AccountResponse {
    error: string;
    data: LichessAccount;
}

export async function getLichessAcount() {
    console.info("retrieving lichess data");
    try {
        const LICHESS_API_KEY = process.env.LICHESS_API_KEY;
        if (!LICHESS_API_KEY) {
            return { error: "LICHESS_API_KEY required." };
        }

        const res = await fetch("https://lichess.org/api/account", {
            headers: { Authorization: `Bearer ${LICHESS_API_KEY}` },
        });

        if (res.status != 200) {
            console.error("failed to retrieve lichess data");
        }

        const data = await res.json();

        return { data } as AccountResponse;
    } catch (error) {
        console.error("Unable to retrieve LichessAccount", error);
        return {
            error: `${error}`,
        } as AccountResponse;
    }
}
