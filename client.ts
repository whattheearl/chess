import { edenTreaty } from "@elysiajs/eden";
import type { App } from "./src/index";

const app = edenTreaty<App>("http://localhost:8080");

const res = await app.index.get();

console.log(res.data);
