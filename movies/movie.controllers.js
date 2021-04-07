const movieModel = require("./movie.model");
const { NotFoundError } = require("../utils/errorHandler");
const fs = require("fs");

class MovieControllers {
  async addMovie(req, res) {
    const { movieName, productionDate, format, actorsList } = req.body;
    const newMovie = new movieModel({
      movieName,
      productionDate,
      format,
      actorsList,
    });

    await newMovie.save();

    res.status(201).json(newMovie);
  }

  async removeMovieFromCollection(req, res) {
    const { id } = req.params;
    await movieModel.removeMovie(id);
    res.status(204).end();
  }

  async getByName(req, res) {
    const { name } = req.params;
    const result = await movieModel.findMovieByName(name);
    if (result.length < 1) {
      throw new NotFoundError("Not found");
    }
    res.status(200).json(result);
  }

  async getByActorName(req, res) {
    const { name } = req.params;
    const result = await movieModel.findByActorName(name);
    if (result.length < 1) {
      throw new NotFoundError("Not found");
    }
    res.status(200).json(result);
  }

  async getSorted(_, res) {
    const result = await movieModel.sortByMovieName();
    res.status(200).json(result);
  }

  async getUploadedData(req, res) {
    console.log(req);
    res.status(200).json({ message: "ok" });
  }

  async allData(req, res) {
    const result = await movieModel.find({});
    res.status(200).json(result);
  }
}

module.exports = new MovieControllers();
