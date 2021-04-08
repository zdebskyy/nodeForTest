const movieModel = require("../movies/movie.model");
const { NotFoundError } = require("../utils/errorHandler");
const should = require("should");
const sinon = require("sinon");
const { getByName } = require("../movies/movie.controllers");

describe("fist test", () => {
  describe("#find movie", () => {
    let sandbox;
    let findMovieByNameStub;
    let result;
    const search = "Data";

    before(async () => {
      sandbox = sinon.createSandbox();
      findMovieByNameStub = sandbox.stub(movieModel, "findMovieByName");
      try {
        await getByName(search);
      } catch (err) {
        result = err;
      }
    });

    after(() => {
      sandbox = sinon.restore();
    });

    it("should call fucntion", () => {
      sinon.assert.calledOnce(findMovieByNameStub);
      sinon.assert.calledWithExactly(findMovieByNameStub, search);
    });
  });
});

// function sum(a, b) {
//   return a + b;
// }
// describe("test", () => {
//   it("test passed", () => {
//     const result = sum(5, 5);
//     result.should.be.eql(10);
//   });
// });
