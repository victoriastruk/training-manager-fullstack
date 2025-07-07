import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  setFilter,
  setCustomDateRange,
  getTrainingsThunk,
} from '../store/slices/trainingsSlice';

function SelectFilter({ filter, setFilter, setCustomDateRange, getTrainings }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    if (filter === 'other' && startDate && endDate) {
      setCustomDateRange({ startDate, endDate });
    } else {
      setCustomDateRange(null);
    }
  }, [startDate, endDate, filter, setCustomDateRange]);

  useEffect(() => {
    getTrainings();
  }, [filter, startDate, endDate, setCustomDateRange]);

  const handleChange = (e) => {
    setFilter(e.target.value);
    if (e.target.value !== 'other') {
      setStartDate('');
      setEndDate('');
    }
  };
  return (
    <div className="flex flex-col items-center">
      <select
        value={filter}
        onChange={handleChange}
        className="px-4 py-2 border rounded shadow cursor-pointer"
      >
        <option value="all">All</option>
        <option value="today">Today</option>
        <option value="week">This week</option>
        <option value="month">This month</option>
        <option value="other">Other</option>
      </select>

      {filter === 'other' && (
        <div className="mt-2 flex gap-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border px-2 py-1 rounded"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border px-2 py-1 rounded"
          />
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  filter: state.trainingsData.filter,
});

const mapDispatchToProps = (dispatch) => ({
  setFilter: (filter) => dispatch(setFilter(filter)),
  setCustomDateRange: (range) => dispatch(setCustomDateRange(range)),
  getTrainings: () => dispatch(getTrainingsThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectFilter);
