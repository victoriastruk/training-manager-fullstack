import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  getTrainingsThunk,
  deleteTrainingThunk,
} from '../store/slices/trainingsSlice';
import { useEffect } from 'react';

function TrainingCard({ trainings, getTrainings, deleteTraining }) {
  useEffect(() => {
    getTrainings();
  }, [getTrainings]);

  const handleDelete = async (id) => {
    await deleteTraining(id);
  };
  
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 cursor-pointer">
      {trainings.map((t) => {
        const month = format(t.date, 'LLLL');
        const day = format(t.date, 'd');
        const time = format(t.date, 'HH:mm');

        return (
          <div
            key={t.id}
            className="border rounded-xl p-4 shadow-md bg-white transition-transform transform hover:scale-105 duration-300 ease-in-out min-h-[200px]"
          >
            <div className="flex gap-4 items-stretch h-full">
              <div className="text-center w-20 shrink-0 flex flex-col justify-center">
                <p className="text-lg font-semibold text-black-700">{month}</p>
                <p className="text-4xl font-bold text-gray-800">{day}</p>
                <p className="text-gray-500">{time}</p>
              </div>

              <div className="flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900">{t.title}</h3>
                <p className="text-gray-600">{t.description}</p>
                <p className="text-gray-400 mt-1">Location: {t.location}</p>
                <p className="text-gray-600 mt-1">
                  Coach: {t.trainer.firstName} {t.trainer.lastName}
                </p>
                <div className="flex gap-2 mt-auto">
                  <Link
                    to={`trainings/${t.id}/registration`}
                    className="bg-[#0056d2] text-white px-4 py-2 rounded hover:bg-[#0e71eb] text-sm"
                  >
                    Register
                  </Link>
                  <button
                    onClick={() => navigate(`/trainings/${t.id}/edit`)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
const mapStateToProps = ({ trainingsData }) => trainingsData;
const mapDispatchToProps = (dispatch) => ({
  getTrainings: () => dispatch(getTrainingsThunk()),
  deleteTraining: (id) => dispatch(deleteTrainingThunk(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TrainingCard);
