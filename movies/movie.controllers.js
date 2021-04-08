const movieModel = require("./movie.model");
const { NotFoundError } = require("../utils/errorHandler");
const { promises: fs } = require("fs");

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
    console.log(req.file);

    let films;

    await fs.readFile(req.file.path, "utf8", function (err, contents) {
      if (err) throw err;
      const items = contents.split("\n").map(function (el) {
        return el.split(/\s+/);
      });

      films = items.map((item) => {
        const FORMAT = "Format";
        const itemTitle = item[0];
        if (itemTitle === FORMAT) {
        }
        const itemValue = item.slice(1);
        return { [itemTitle]: itemValue };
      });

      console.log(films);
    });
    res.status(200).json(films);
  }

  async allData(req, res) {
    const result = await movieModel.find({});

    res.status(200).json(result);
  }
}

module.exports = new MovieControllers();
