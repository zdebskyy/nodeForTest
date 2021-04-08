const { addMovie, getByName } = require("../movies/movie.controllers.js");

describe("addMovie", () => {
  it("find all realated movies in collection", async (done) => {
    // expect(1).toBe(1);

    const mReq = {
      params: {
        name: "Data",
      },
    };
    const mRes = { json: jest.fn() };

    await getByName(mReq, mRes);

    expect(mRes.json).toBeCalledWith({
      result,
    });

    done();
  }, 30000);
});

// describe("addMovie", () => {
//   it("On add movie all fields should be filled", async (done) => {
//     // expect(1).toBe(1);

//     const mReq = {
//       body: {
//         movieName: "qqq",
//         productionDate: 2020,
//         format: "VHS",
//         actorsList: [{ name: "Alex", surname: "Norton" }],
//       },
//     };
//     const mRes = { json: jest.fn() };

//     await addMovie(mReq, mRes);

//     expect(mRes.json).toBeCalledWith({
//       newMovie,
//     });

//     done();
//   }, 30000);
// });

// describe("searchByName", () => {
//   it("find all realated movies in collection", async (done) => {
//     // expect(1).toBe(1);

//     const mReq = {
//       params: {
//         name: "Data",
//       },
//     };
//     const mRes = { json: jest.fn() };

//     await getByName(mReq, mRes);

//     expect(mRes.json).toBeCalledWith({
//       result,
//     });

//     done();
//   }, 30000);
// });
