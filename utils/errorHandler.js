class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}
class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}

module.exports = {
  NotFoundError,
  ConflictError,
};
