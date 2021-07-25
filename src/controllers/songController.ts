import { Request, Response } from "express";

import * as songService from "../services/songService";

async function sendOk(req: Request, res: Response) {
    const { name, youtubeLink } = req.body;
	if (!req || !res) return res.sendStatus(400);
    else{
        const register = await songService.registerSong(name, youtubeLink);
        
        if(register == null){
            return res.sendStatus(401);
        }
        else{
            return res.sendStatus(200);
        }

    }
    
}

async function upVote (req: Request, res: Response){
    if(!req || !res) return res.sendStatus(400);
    else{
        const vote = await songService.upVoteSong(req.params.id);
        if(vote == null){
            return res.sendStatus(401);
        }
        else{
            return res.sendStatus(200);
        }
    }
}

export { sendOk, upVote };
