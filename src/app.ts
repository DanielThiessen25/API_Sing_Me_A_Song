import express from "express";
import cors from "cors";

import * as controller from "./controllers/songController";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/recommendations", controller.sendOk);

export default app;
