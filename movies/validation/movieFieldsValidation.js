const Joi = require("joi");

function validateMovieAdd(req, res, next) {
  const schema = Joi.object({
    movieName: Joi.string().min(3).required(),
    productionDate: Joi.number().min(1850).max(2021).required(),
    format: Joi.string().required(),
    actorsList: Joi.array()
      .items({
        name: Joi.string().required(),
        surname: Joi.string().required(),
      })
      .required(),
  });

  const result = schema.validate(req.body);

  if (result.error) {
    return res.status(400).send(result.error);
  }
  next();
}
module.exports = {
  validateMovieAdd,
};
