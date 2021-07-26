import connection from '../database';
import * as songRepository from '../repositories/songRepository';

async function registerSong(name: string, link: string) {

    if(!name || !link){
        return null;
    } 
    const isYoutube = link.search("www.youtube");
    if(isYoutube === -1){
        return null;
    }

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

async function downVoteSong(id:string){
    const getSong = await songRepository.searchPoint(id);
    if (getSong == null){
        return null;
    }
    else{
        if(getSong.points <= -5){
            const removeSong = await songRepository.removeRecommendations(id);
        }
        else{
            const lowPoint = await songRepository.lowPoint(id, getSong.points - 1);
        }
        return true;
    }
}

async function randomSong(){
    const songs = await songRepository.selectAllSongs();
    let popularSongs = [];
    let unpopularSongs = [];
    for(let i = 0; i < songs.length; i++){
        if(songs[i].points > 10){
            popularSongs.push(songs[i]);
        }
        else{
            unpopularSongs.push(songs[i]);
        }
    }

    if(popularSongs.length > 0 && unpopularSongs.length>0){
        let randomNumber = Math.random();
        if(randomNumber <= 0.3){
            let randomIndex = Math.floor(Math.random()*(unpopularSongs.length));
            return unpopularSongs[randomIndex];
        }
        else{
            let randomIndex = Math.floor(Math.random()*(popularSongs.length));
            return popularSongs[randomIndex];
        }
    }
    else{
        let randomIndex = Math.floor(Math.random()*(songs.length));
        return songs[randomIndex];
    }
}

async function topSongs (amount:number){
    const songs =  await songRepository.selectAllSongs();
    songs.sort(function compare(a,b) {
        if (a.points < b.points)
           return 1;
        if (a.points > b.points)
          return -1;
        return 0;
      });
      let amountSongs = songs.slice(0, amount);
      return amountSongs;
}


export { registerSong, upVoteSong, downVoteSong, randomSong, topSongs };