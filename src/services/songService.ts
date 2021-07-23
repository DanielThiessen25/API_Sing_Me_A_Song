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

export { registerSong };