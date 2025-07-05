import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { connect } from 'react-redux';
import {
  getUserTrainingsThunk,
  unsubscribeUserFromTrainingThunk,
} from '../store/slices/trainingsSlice';
import { useEffect } from 'react';

function UserTrainingsList({
  getUserTrainings,
  userTrainings,
  unsubscribeFromTraining,
}) {
  const { id } = useParams();

  useEffect(() => {
    getUserTrainings(id);
  }, [getUserTrainings, id]);

  const handleUnsubscribe = (trainingId) => {
    unsubscribeFromTraining({ id, trainingId });
  };
  return (
    <div>
      {userTrainings.length === 0 ? (
        <p className="text-gray-600">
          You are not subscribed to any trainings yet.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
          {userTrainings.map((t) => {
            const month = format(t.date, 'LLLL');
            const day = format(t.date, 'd');
            const time = format(t.date, 'HH:mm');
            return (
              <div
                key={t.id}
                className="bg-white rounded-xl shadow p-4 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-xl font-semibold mb-2">{t.title}</h2>
                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">When: </span>
                    <strong>
                      {day} {month} {time}
                    </strong>
                  </p>
                  <p className="text-gray-700 mb-3">
                    <span className="font-medium">Location:</span> {t.location}
                  </p>
                </div>

                <div className="mt-2 flex justify-end gap-2">
                  <button
                    onClick={() => handleUnsubscribe(t.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                  >
                    Unsubscribe
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
const mapStateToProps = ({ trainingsData }) => ({
  userTrainings: trainingsData.userTrainings,
});
const mapDispatchToProps = (dispatch) => ({
  getUserTrainings: (id) => dispatch(getUserTrainingsThunk(id)),
  unsubscribeFromTraining: ({ id, trainingId }) =>
    dispatch(unsubscribeUserFromTrainingThunk({ id, trainingId })),
});
export default connect(mapStateToProps, mapDispatchToProps)(UserTrainingsList);
