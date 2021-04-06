const movieModel = require("./movie.model");
const { NotFoundError } = require("../utils/errorHandler");

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

    res.status(201).send({
      id: newMovie._id,
      name: newMovie.movieName,
      date: newMovie.productionDate,
      format,
      actorsList,
    });
  }

  async removeMovieFromCollection(req, res) {
    const { id } = req.params;
    await movieModel.removeMovie(id);
    res.status(204).end();
  }

  async getByName(req, res) {
    const { name } = req.query;
    const result = await movieModel.findMovieByName(name);
    if (result.length < 1) {
      throw new NotFoundError("Not found");
    }
    res.status(200).json(result);
  }

  async getByActorName(req, res) {
    const { name } = req.query;
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

  async movieDetails(req, res) {
    const { id } = req.params;
    const result = await movieModel.getInfoAboutMovie(id);
    res.status(200).json(result);
  }
}

module.exports = new MovieControllers();
