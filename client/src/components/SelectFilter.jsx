import { useEffect } from 'react';
import { connect } from 'react-redux';
import { setFilter, getTrainingsThunk } from '../store/slices/trainingsSlice';

function SelectFilter({ filter, setFilter, getTrainings }) {
  //   const handleChange = (e) => {
  //     const newFilter = e.target.value;
  //     setFilter(newFilter);
  //     getTrainings();
  //   };
  useEffect(() => {
    getTrainings();
  }, [filter]);
  const handleChange = (e) => {
    setFilter(e.target.value);
  };
  return (
    <select
      value={filter}
      onChange={handleChange}
      className="px-4 py-2 border rounded shadow"
    >
      <option value="all">All</option>
      <option value="today">Today</option>
      <option value="week">This week</option>
      <option value="month">This month</option>
    </select>
  );
}

const mapStateToProps = (state) => ({
  filter: state.trainingsData.filter,
});

const mapDispatchToProps = (dispatch) => ({
  setFilter: (filter) => dispatch(setFilter(filter)),
  getTrainings: () => dispatch(getTrainingsThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectFilter);
