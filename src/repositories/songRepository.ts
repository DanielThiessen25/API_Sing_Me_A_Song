import connection from "../database";

async function addRecommendations(name:string, link:string) {
  const result = await connection.query(`INSERT INTO songs (name,youtubeLink) VALUES ($1, $2)`,[name, link]);
 
  return result.rows[0];
}

export { addRecommendations };