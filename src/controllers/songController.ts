import { Request, Response } from "express";

import * as songService from "../services/songService";

async function sendOk(req: Request, res: Response) {
    const { name, youtubeLink } = req.body;
	if (!req || !res) return res.sendStatus(400);
    else{
        const register = await songService.registerSong(name, youtubeLink);
        
        if(register == null){
            res.sendStatus(401);
        }
        else{
            res.sendStatus(200);
        }

    }
    
}

export { sendOk };
