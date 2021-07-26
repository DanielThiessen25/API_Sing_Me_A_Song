import express from "express";
import cors from "cors";

import * as songController from "./controllers/songController";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/recommendations", songController.sendOk);
app.post("/recommendations/:id/upvote", songController.upVote);
app.post("/recommendations/:id/downvote", songController.downVote);
app.get("/recommendations/random", songController.randomSelect);
app.get("/recommendations/top/:amount", songController.listTop);

export default app;
