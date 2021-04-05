const { Router } = require("express");
const asyncWrapper = require("../utils/asyncWrapper");
const {
  addMovie,
  removeMovieFromCollection,
  getByName,
  getByActorName,
  getSorted,
  movieDetails,
} = require("./movie.controllers");
const { validateMovieAdd } = require("./validation/movieFieldsValidation");

const movieRouter = Router();

movieRouter.post("/add-movie", validateMovieAdd, asyncWrapper(addMovie));
movieRouter.delete(
  "/remove-movie/:id",
  asyncWrapper(removeMovieFromCollection)
);
movieRouter.get("/about-movie/:id", asyncWrapper(movieDetails));
movieRouter.get("/sort-by-name", asyncWrapper(getSorted));
movieRouter.get("/find-by-name", asyncWrapper(getByName));
movieRouter.get("/find-by-actor", asyncWrapper(getByActorName));

module.exports = movieRouter;
