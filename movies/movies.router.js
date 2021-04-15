const { Router } = require("express");
const path = require("path");
const multer = require("multer");
const asyncWrapper = require("../utils/asyncWrapper");
const {
  addMovie,
  removeMovieFromCollection,
  getByName,
  getByActorName,
  getSorted,
  getUploadedData,
  allData,
} = require("./movie.controllers");
const { validateMovieAdd } = require("./validation/movieFieldsValidation");

const movieRouter = Router();

const storage = multer.diskStorage({
  destination: "uploads",
  filename: function (req, file, cb) {
    const ext = path.parse(file.originalname).ext;

    cb(null, Date.now() + ext);
  },
});
const upload = multer({ storage });

movieRouter.post("/add-movie", validateMovieAdd, asyncWrapper(addMovie));
movieRouter.delete(
  "/remove-movie/:id",
  asyncWrapper(removeMovieFromCollection)
);
movieRouter.get("/", asyncWrapper(allData));
movieRouter.get("/sort-by-name/:sort", asyncWrapper(getSorted));
movieRouter.get("/find-by-name/:name", asyncWrapper(getByName));
movieRouter.get("/find-by-actor/:name", asyncWrapper(getByActorName));
movieRouter.post("/upload", upload.single("file"), getUploadedData);

module.exports = movieRouter;
