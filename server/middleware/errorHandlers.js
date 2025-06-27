module.exports.errorHandler = (err, req, res, next) => {
  if (res.headerSend) {
    return;
  }

  const status = err.status ?? 500;
  const message = err.message ?? 'Server Error';

  res.status(status).send({ errors: [{ status, title: message }] });
};
