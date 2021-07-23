import { Request, Response } from "express";

async function sendOk(req: Request, res: Response) {
	res.send("OK!");
}

export { sendOk };