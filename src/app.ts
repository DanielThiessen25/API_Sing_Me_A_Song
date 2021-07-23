import express from "express";
import cors from "cors";
import connection from "./database";

import * as controller from "./controllers/controller";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/recommendations", controller.sendOk);

export default app;
