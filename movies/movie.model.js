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
movieSchema.statics.getInfoAboutMovie = getInfoAboutMovie;

async function removeMovie(movieId) {
  return this.findByIdAndDelete(movieId);
}

async function findMovieByName(query) {
  return this.find({ movieName: query });
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

async function getInfoAboutMovie(id) {
  return this.findById(id);
}

const movieModel = mongoose.model("Movie", movieSchema);

module.exports = movieModel;
