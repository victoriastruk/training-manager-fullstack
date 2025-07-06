import { Formik, Form } from 'formik';
import { format } from 'date-fns';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Input from './Input';
import {
  getTrainingByIdThunk,
  updateTrainingThunk,
} from '../../store/slices/trainingsSlice';
import { getTrainersThunk } from '../../store/slices/usersSlice';

const formatDateForInput = (dateStr) => {
  if (!dateStr) return '';
  return format(new Date(dateStr), "yyyy-MM-dd'T'HH:mm");
};

function TrainingFormUpdate({
  getTrainingById,
  training,
  getTrainers,
  trainers,
  updateTraining,
}) {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getTrainingById(id);
  }, [getTrainingById, id]);

  useEffect(() => {
    getTrainers();
  }, []);

  if (!training || trainers.length === 0) return <div>Loading...</div>;

  const initialValues = {
    title: training?.title || '',
    description: training?.description || '',
    date: formatDateForInput(training?.date),
    location: training?.location || '',
    trainerId: training?.trainerId || '',
  };

  const handleSubmit = async (values, formik) => {
    await updateTraining({ id: training.id, data: values });
    navigate('/');
  };

  return (
    <div className="w-full max-w-xl">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {(formikProps) => (
          <Form className="space-y-4">
            <Input
              label="Title"
              type="text"
              name="title"
              className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <Input
              label="Description"
              type="text"
              name="description"
              className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <Input
              label="Date and Time"
              type="datetime-local"
              name="date"
              className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <Input
              label="Location"
              type="text"
              name="location"
              className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {trainers.length !== 0 && (
              <div className="mt-1">
                <label
                  htmlFor="trainerId"
                  className="block mb-2 font-semibold text-gray-700"
                >
                  Coach
                </label>
                <select
                  id="trainerId"
                  name="trainerId"
                  value={formikProps.values.trainerId}
                  onChange={formikProps.handleChange}
                  className="mt-1 p-3 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm cursor-pointer"
                >
                  <option value="">Select a coach</option>
                  {trainers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.firstName} {t.lastName}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Edit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
const mapStateToProps = (state) => ({
  training: state.trainingsData.training,
  trainers: state.usersData.trainers,
});
const mapDispatchToProps = (dispatch) => ({
  getTrainingById: (id) => dispatch(getTrainingByIdThunk(id)),
  getTrainers: () => dispatch(getTrainersThunk()),
  updateTraining: (id, data) => dispatch(updateTrainingThunk(id, data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TrainingFormUpdate);
