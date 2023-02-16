const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'endpoint not found' });
};

// eslint-disable-next-line consistent-return
const errorHandler = (err, req, res, next) => {
  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' });
  } if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }

  next(err);
};

module.exports = { unknownEndpoint, errorHandler };
