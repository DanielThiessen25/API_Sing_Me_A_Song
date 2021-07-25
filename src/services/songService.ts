import * as songRepository from '../repositories/songRepository';

async function registerSong(name: string, link: string) {
    //testar regras do negocio

    if(!name || !link){
        return null;
    } 
    //checar se o link é link do youtube

    else{
        const add = await songRepository.addRecommendations(name, link);
        return true;
    }
    
}

async function upVoteSong(id:string){
    const getSong = await songRepository.searchPoint(id);
    if (getSong == null){
        return null;
    }
    else{
        const addPoint = await songRepository.addPoint(id, getSong.points + 1);
        return true;
    }

    

}

export { registerSong, upVoteSong };