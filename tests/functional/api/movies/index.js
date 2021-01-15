import chai from "chai";
import request from "supertest";
import api from "../../../../index";  // Express API application 

const expect = chai.expect;
const currentMovieId = 671583;
const currentMovieTitle = "Upside-Down Magic";
let token;

describe('Movies endpoint',  function (){
    this.timeout(5000)
    before((done)=>{
        setTimeout(()=>{
           done();
        },4500)
    })
    before( (done)=>{
      request(api)
      .post("/api/users")
      .send({
        "username":"user1",
        "password":"test1"
      })
      .end((err,res)=>{
        token = res.body.token;
        console.log(token);
        done()
      });
    });
    describe("GET /movies ", () => {
      describe("when the token is valid", () => {
          it("should check token and return the 20 movies", (done) => {
            request(api)
            .get("/api/movies")
            .set("Accept", "application/json")
            .set("Authorization", token)
            .expect("Content-Type", /json/)
            .expect(200)
            .end((err, res) => {
                expect(res.body).to.be.a("array");
                expect(res.body.length).to.equal(20);
              done();
            });
          });
        });
        describe("when the token is invalid", () => {
          it("should return 401 and Unauthorized", (done) => {
             request(api)
            .get("/api/movies")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .end((err, res)=>{
              expect(res.status).to.equal(401);
              done();
            });
          });
        });
      });
      describe("GET /movies/:id", () => {
        describe("when the id is valid", () => {
          it("should return the matching movie", () => {
            return request(api)
              .get(`/api/movies/${currentMovieId}`)
              .set("Accept", "application/json")
              .set("Authorization", token)
              .expect("Content-Type", /json/)
              .expect(200)
              .then((res) => {
                expect(res.body).to.have.property("title", currentMovieTitle);
              });
          });
        });
        describe("when the id is invalid", () => {
          it("should return the NOT found message", () => {
            return request(api)
              .get("/api/movies/9999")
              .set("Accept", "application/json")
              .set("Authorization", token)
              .expect("Content-Type", /json/)
              .expect({
                message: "Unable to find movie with id: 9999.",
                status: 404,
              });
          });
        });
      });
});