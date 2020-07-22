const admin = require("../routes/admin");
const request = require('supertest');
const app = require('../server');
const connection = require('../db');


/* GET admin datas (sans BCRYPT)*/
describe("GET /admin", () => {
  it("admin datas : returns 200 and success", async (done) => {
    request(app)
      .get("/admin")
      .expect(200, [
        {
          id_admin: 1,
          name: "Benji",
          password: "password",
        },
      ])
      .end((err) => {
        app.close();
        if (err) return done(err);
        return done();
      });
  });
});
