import chai from "chai";
import request from "supertest";

const expect = chai.expect;

let api;
let token;

const samplePerson = {
    id: 1813,
    name: "Anne Hathaway",
    movie_credits_title: "Becoming Jane",
};

describe("Persons endpoint", () => {
  beforeEach(function(done) {
    this.timeout(6000)
    try {
      api = require("../../../../index");
    } catch (err) {
      console.error(`failed to Load user Data: ${err}`);
    }
    setTimeout(()=>{
      request(api)
      .post("/api/users")
      .send({
        "username":"user1",
        "password":"test1"
      })
      .end((err,res) =>{
        token= res.body.token;
        done();
      });
    },4000)
  });

  afterEach(() => {
    api.close(); // Release PORT 8080
    delete require.cache[require.resolve("../../../../index")];
  });
  describe("GET /peoples ", () => {
    it("should return 20 persons and a status 200", (done) => {
      request(api)
        .get("/api/peoples")
        .set("Accept", "application/json")
        .set("Authorization",token)
        .expect("Content-Type", /json/)
        .expect(200)
        .end((err, res) => {
          expect(res.body).to.be.a("array");
          expect(res.body.length).to.equal(20);
          done();
        });
    });
    it("should not return 20 popular persons and get an error massage", () => {
      request(api)
        .get("/api/peoples")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect({
          success: false,
          status_code: 34,
          status_message: "The resource you requested could not be found.",
        });
    });
  });

  describe("GET /peoples/:id", () => {
    describe("when the id is valid", () => {
      it("should return the matching person", () => {
        return request(api)
          .get(`/api/peoples/${samplePerson.id}`)
          .set("Accept", "application/json")
          .set("Authorization", token)
          .expect("Content-Type", /json/)
          .expect(200)
          .then((res) => {
            expect(res.body).to.have.property("name", samplePerson.name);
          });
      });
    });
    describe("when the id is invalid", () => {
      it("should return the NOT found message", () => {
        return request(api)
          .get("/api/peoples/xxx")
          .set("Accept", "application/text")
          .set("Authorization", token)
          .expect("Content-Type", /text/)
          .expect({});
      });
    });
  });


});
