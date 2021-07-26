import "../../src/setup";
import { clearDatabase, endConnection } from "../utils/database";
import supertest from "supertest";
import app from "../../src/app";
import connection from "../../src/database";

beforeEach(async () => {
  await clearDatabase();
});

afterAll(async () => {
    await endConnection();
  });
  const body = {
    name: "Testing",
    youtubeLink: "https://www.youtube.com/"
  };

describe("POST /recommendations", () => {
  it("should inserts the new song to the database", async ()=>{
    const beforeInsert = await connection.query("SELECT * FROM songs");
    await supertest(app).post("/recommendations").send(body);
    const afterInsert = await connection.query("SELECT * FROM songs");
    expect(beforeInsert.rows.length).toEqual(0);
    expect(afterInsert.rows.length).toEqual(1);
  });

  it("should answer with status 200 for sucessful insertions", async () => {
    const result = await supertest(app).post("/recommendations").send(body);
    expect(result.status).toBe(200);
  });

});

describe("POST /recommendations/:id/upvote", () => {
  it("should add one point on the song score and return 200" , async () => {
    await supertest(app).post("/recommendations").send(body);
    const beforeVote = await connection.query("SELECT * FROM songs WHERE id=1");
    const result = await supertest(app).post("/recommendations/1/upvote");
    const afterVote = await connection.query("SELECT * FROM songs WHERE id=1");

    expect(afterVote.rows[0].points).toBe(beforeVote.rows[0].points + 1);
    expect(result.status).toBe(200);
  });
});

describe("POST /recommendations/:id/downvote", () => {
  it("should subtract one point on the song score and return 200" , async () => {
    await supertest(app).post("/recommendations").send(body);
    const beforeVote = await connection.query("SELECT * FROM songs WHERE id=1");
    const result = await supertest(app).post("/recommendations/1/downvote");
    const afterVote = await connection.query("SELECT * FROM songs WHERE id=1");

    expect(afterVote.rows[0].points).toBe(beforeVote.rows[0].points - 1);
    expect(result.status).toBe(200);
  });

  it("should remove the song if score is less than -5 and return 200", async ()=>{
    await supertest(app).post("/recommendations").send(body);
    for(let i = 0; i<6; i++){
        await supertest(app).post("/recommendations/1/downvote");
    }
    const afterRemoval = await connection.query("SELECT * FROM songs");
    expect(afterRemoval.rows.length).toBe(0);
  });
});

describe("get /recommendations/random", ()=>{
  it("should return a random song" , async () => {
    await supertest(app).post("/recommendations").send(body);
    await supertest(app).post("/recommendations/upvote")
    const result = await supertest(app).get("/recommendations/random");
    console.log(result);
    expect(result.body.id).toBe(1);
  });

});

describe("get /recommendations/top/:amount", ()=>{
  const body2 = {
    name: "Testing2",
    youtubeLink: "https://www.youtube.com/watch?v=kXYiU_JCYtU"
  };
  const body3 = {
    name: "Testing3",
    youtubeLink: "https://www.youtube.com/watch?v=TdrL3QxjyVw"
  };
  it("should return a list of a certain length of top score songs" , async () => {
    await supertest(app).post("/recommendations").send(body);
    await supertest(app).post("/recommendations").send(body2);
    await supertest(app).post("/recommendations").send(body3);
    const result = await supertest(app).get("/recommendations/top/2");
    expect(result.body.length).toBe(2);
  });

});

