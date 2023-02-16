const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'endpoint not found' });
};

// eslint-disable-next-line consistent-return
const errorHandler = (err, req, res, next) => {
  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  }

  next(err);
};

module.exports = { unknownEndpoint, errorHandler };
