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

async function removeMovie(movieId) {
  return this.findByIdAndDelete(movieId);
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

async function sortByMovieName() {
  return this.find().sort({ movieName: 1 });
}

const movieModel = mongoose.model("Movie", movieSchema);

module.exports = movieModel;
