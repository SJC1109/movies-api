import chai from "chai";
import request from "supertest";
const mongoose = require("mongoose");
import User from "../../../../api/users/userModel";
import api from "../../../../index";

const expect = chai.expect;

let db;
//let api;
let token;
let specfiedUser;
let movieId = 590706

const users = [
  {
    username: "user1",
    password: "test1",
  },
  {
    username: "user2",
    password: "test2",
  },
];

describe("Users endpoint", () => {
  before((done) => {
    mongoose.connect(process.env.mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = mongoose.connection;
    request(api)
      .post("/api/users")
      .send({
        "username": "user1",
        "password": "test1"
      })
      .end((err, res) => {
        token = res.body.token;
        console.log(token)
        done();
      });
  });

  // after(async () => {
  //   try {
  //     await db.dropDatabase();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // });
  beforeEach(async () => {
    try {
      //api = require("../../../../index");
      await User.deleteMany({});
      await User.collection.insertMany(users);
    } catch (err) {
      console.error(`failed to Load user Data: ${err}`);
    }
  });
  afterEach(() => {
    api.close();
    delete require.cache[require.resolve("../../../../index")];
  });
  describe("GET /users ", () => {
    it("should return the 2 users and a status 200", (done) => {
      request(api)
        .get("/api/users")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(2);
          let result = res.body.map((user) => user.username);
          expect(result).to.have.members(["user1", "user2"]);
          done();
        });
    });
  });

  describe("POST / ", () => {
    it("should return a 401 status with a right uername but a wrong password", () => {
      request(api)
        .post("/api/users?action=register")
        .send({
          username: "user1",
          password: "test2",
        })
        .expect(200)
        .end((err, res) => {
          // console.log(res.body.msg);
          expect(res.body.msg).to.equal(undefined);
        });
    });
    it("should return a 200 status and the confirmation message", () => {
      return request(api)
        .post("/api/users?action=register")
        .send({
          username: "user3",
          password: "test3",
        })
        .expect(201)
        .expect({ code: 201, msg: 'Successful created new user.' });
    });
    after(() => {
      return request(api)
        .get("/api/users")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(3);
          let result = res.body.map((user) => user.username);
          expect(result).to.have.members(["user1", "user2", "user3"]);
          specfiedUser = res.body[0]
        });
    });
    
  });

  describe("PUT / ", () => {
    it("should return a 200 status and the updated user", () => {
      let username = "newName"
      return request(api)
        .put(`/api/users/${specfiedUser._id}`)
        .send({
          username
        })
        .expect(200)
        .then((res) => {
          request(api)
          .get("/api/users")
          .then((res) => {
            expect(res).to.have.members(["user1", "user2", username]);
          })
        })
    });
  })

  describe("Favourites / ", () => {
    it("should return a 201 status and message", () => {
      return request(api)
        .post(`/api/users/user1/favourites`)
        .send({
          id: movieId
        })
        .expect(201)
        .then((res) => {
          expect(res.body.favourites.length).to.be.above(0)
        })
    });
    it("should return a 200 status and favourites list", () => {
      return request(api)
        .get(`/api/users/user1/favourites`)
        .expect(200)
        .then((res) => {  
          expect(res.body.length).to.equal(0);
        })
    });
  })
});
