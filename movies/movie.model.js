const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const movieSchema = new Schema({
  movieName: { type: String },
  productionDate: { type: Number },
  format: { type: String, enum: ["VHS", "DVD", "Blu-Ray"] },
  actorsList: [
    {
      name: String,
      surname: String,
    },
  ],
});

movieSchema.statics.removeMovie = removeMovie;
movieSchema.statics.findMovieByName = findMovieByName;
movieSchema.statics.findByActorName = findByActorName;
movieSchema.statics.sortByMovieName = sortByMovieName;
movieSchema.statics.movieCheck = movieCheck;

async function removeMovie(movieId) {
  return this.findByIdAndDelete(movieId);
}

async function movieCheck(name, date) {
  const movieToCheck = await this.find({
    $and: [{ movieName: name }, { productionDate: { $eq: date } }],
  });
  return movieToCheck;
}

async function findMovieByName(query) {
  const allMovie = await this.find({});
  return allMovie.filter((item) =>
    item.movieName.toLowerCase().includes(query.toLowerCase())
  );
}

async function findByActorName(queryName) {
  return this.find({
    actorsList: {
      $elemMatch: { $or: [{ name: queryName }, { surname: queryName }] },
    },
  });
}

async function sortByMovieName(sort) {
  const allMovie = await this.find({});
  if (sort === "A-Z") {
    return allMovie.sort(function (a, b) {
      const nameA = a.movieName.toUpperCase();
      const nameB = b.movieName.toUpperCase();
      if (
        nameA.localeCompare(nameB, "UA", { sensitivity: "base" }) <
        nameB.localeCompare(nameA, "UA", { sensitivity: "base" })
      ) {
        return -1;
      }
      if (
        nameA.localeCompare(nameB, "UA", { sensitivity: "base" }) >
        nameB.localeCompare(nameA, "UA", { sensitivity: "base" })
      ) {
        return 1;
      }
      return 0;
    });
  }
  if (sort === "Z-A") {
    return allMovie.sort(function (a, b) {
      const nameA = a.movieName.toUpperCase();
      const nameB = b.movieName.toUpperCase();
      if (
        nameA.localeCompare(nameB, "UA", { sensitivity: "base" }) >
        nameB.localeCompare(nameA, "UA", { sensitivity: "base" })
      ) {
        return -1;
      }
      if (
        nameA.localeCompare(nameB, "UA", { sensitivity: "base" }) <
        nameB.localeCompare(nameA, "UA", { sensitivity: "base" })
      ) {
        return 1;
      }
      return 0;
    });
  }
}

const movieModel = mongoose.model("Movie", movieSchema);

module.exports = movieModel;
