import connection from "../database";

async function addRecommendations(name:string, link:string) {
  const result = await connection.query(`INSERT INTO songs (name,youtubeLink) VALUES ($1, $2)`,[name, link]);
 
  return result.rows[0];
}

async function searchPoint(id:string){
  const result = await connection.query(`SELECT * FROM songs WHERE id = $1`, [id]);
  return result.rows[0];
}

async function addPoint(id:string, points:number){
  const result = await connection.query(`UPDATE songs SET points = $1 WHERE id = $2`, [points, id]);
  return result.rows[0];
}

async function lowPoint(id:string, points:number){
  const result = await connection.query(`UPDATE songs SET points = $1 WHERE id = $2`, [points, id]);
  return result.rows[0];
}

async function removeRecommendations(id:string){
  const result = await connection.query(`DELETE FROM songs WHERE id = $1`, [id]);
  return result.rows[0];
}

async function selectAllSongs(){
    const result = await connection.query(`SELECT * FROM songs`);
    return result.rows;
}

export { addRecommendations, addPoint, searchPoint, lowPoint, removeRecommendations, selectAllSongs };