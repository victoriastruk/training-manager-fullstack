import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import Input from './Input';
import { getTrainersThunk } from '../../store/slices/usersSlice';

function TrainingFormCreate({ getTrainers, trainers }) {
  const initialValues = {
    title: '',
    description: '',
    date: '',
    location: '',
    trainerId: '',
  };

  const handleSubmit = async (values, formik) => {
    await registerOnTraining({ id: trainingId, values });
    formik.resetForm();
  };

  useEffect(() => {
    getTrainers();
  }, []);

  return (
    <div className="w-full max-w-xl">
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
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
              Create
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
const mapStateToProps = ({ usersData }) => usersData;
const mapDispatchToProps = (dispatch) => ({
  getTrainers: () => dispatch(getTrainersThunk()),
});
export default connect(mapStateToProps, mapDispatchToProps)(TrainingFormCreate);
