import { format, parseISO } from 'date-fns';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTrainingByIdThunk } from '../store/slices/trainingsSlice';
import { useEffect } from 'react';
function TrainingInfo({ training, getTrainingById }) {
  const { id } = useParams();
  useEffect(() => {
    getTrainingById(id);
  }, [getTrainingById, id]);

  if (!training || !training.date) {
    return <p>Loading training info...</p>;
  }

  const dateObj = parseISO(training.date);

  const month = format(dateObj, 'LLLL');
  const day = format(dateObj, 'd');
  const time = format(dateObj, 'HH:mm');

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Register for this training</h1>

      <p className="text-gray-700">
        Topic: <strong>{training.title}</strong>
      </p>
      <p className="text-gray-700 ">
        Description: <strong>{training.description}</strong>
      </p>
      <p className="text-gray-700 ">
        When:{' '}
        <strong>
          {day} {month} {time}
        </strong>
      </p>
      <p className="text-gray-700 mb-4">
        Location: <strong>{training.location}</strong>
      </p>
      <p className="text-gray-700">
        Coach:
        <strong>
          {training.trainer.firstName} {training.trainer.lastName}
        </strong>
      </p>
      <p className="text-gray-700">
        Email: <strong>{training.trainer.email}</strong>
      </p>
    </>
  );
}
const mapStateToProps = ({ trainingsData }) => trainingsData;
const mapDispatchToProps = (dispatch) => ({
  getTrainingById: (id) => dispatch(getTrainingByIdThunk(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TrainingInfo);
