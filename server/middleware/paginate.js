module.exports.paginateTrainings = (req, res, next) => {
  const { page = 1, results = 9 } = req.query;

  req.pagination = {
    limit: Number(results),
    offset: (page - 1) * results,
  };
  next();
};
