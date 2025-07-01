const { Op } = require('sequelize');
const {
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  parseISO,
} = require('date-fns');

function getDateRange(filter) {
  const now = new Date();

  switch (filter) {
    case 'today':
      return {
        [Op.gte]: startOfDay(now),
        [Op.lte]: endOfDay(now),
      };
    case 'week':
      return {
        [Op.gte]: startOfWeek(now, { weekStartsOn: 1 }),
        [Op.lte]: endOfWeek(now, { weekStartsOn: 1 }),
      };
    case 'month':
      return {
        [Op.gte]: startOfMonth(now),
        [Op.lte]: endOfMonth(now),
      };
    default:
      return null;
  }
}

module.exports.filterDate = (req, res, next) => {
  const { dateFilter, startDate, endDate } = req.query;
  const where = {};

  const range = getDateRange(dateFilter);
  if (range) {
    where.date = range;
  } else if (startDate && endDate) {
    where.date = {
      [Op.between]: [parseISO(startDate), parseISO(endDate)],
    };
  }

  req.dateFilter = where;
  next();
};
