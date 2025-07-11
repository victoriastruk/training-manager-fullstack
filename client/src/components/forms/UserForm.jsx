import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import Input from './Input';
import {
  registerOnTrainingThunk,
  clearRegistrationResult,
} from '../../store/slices/trainingsSlice';

function UserForm({
  registrationResult,
  registerOnTraining,
  clearRegistrationResult,
}) {
  const navigate = useNavigate();
  const { id: trainingId } = useParams();

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
  };

  useEffect(() => {
    if (registrationResult?.userId) {
      navigate(`/users/${registrationResult.userId}/trainings`);
      clearRegistrationResult();
    }
  }, [registrationResult, navigate]);

  const handleSubmit = async (values, formik) => {
    await registerOnTraining({ id: trainingId, values });
    formik.resetForm();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(formikProps) => (
        <Form className="space-y-4">
          <Input
            label="First Name"
            type="text"
            name="firstName"
            className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <Input
            label="Last Name"
            type="text"
            name="lastName"
            className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <Input
            label="Email Address"
            type="email"
            name="email"
            className="mt-1 p-2 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Register
          </button>
        </Form>
      )}
    </Formik>
  );
}
const mapStateToProps = ({ trainingsData }) => trainingsData;

const mapDispatchToProps = (dispatch) => ({
  registerOnTraining: (payload) => dispatch(registerOnTrainingThunk(payload)),
  clearRegistrationResult: () => dispatch(clearRegistrationResult()),
});
export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
