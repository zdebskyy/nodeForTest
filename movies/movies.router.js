const { Router } = require("express");
const asyncWrapper = require("../utils/asyncWrapper");
const {
  addMovie,
  removeMovieFromCollection,
  getByName,
  getByActorName,
  getSorted,
  getUploadetData,
  allData,
} = require("./movie.controllers");
const { validateMovieAdd } = require("./validation/movieFieldsValidation");

const movieRouter = Router();

movieRouter.post("/add-movie", validateMovieAdd, asyncWrapper(addMovie));
movieRouter.delete(
  "/remove-movie/:id",
  asyncWrapper(removeMovieFromCollection)
);
movieRouter.get("/", asyncWrapper(allData));
movieRouter.get("/sort-by-name", asyncWrapper(getSorted));
movieRouter.get("/find-by-name/:name", asyncWrapper(getByName));
movieRouter.get("/find-by-actor/:name", asyncWrapper(getByActorName));
movieRouter.post("/upload", asyncWrapper(getUploadetData));

module.exports = movieRouter;
